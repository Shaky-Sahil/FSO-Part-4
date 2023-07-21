const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/userdb');

userRouter.get('/', async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

userRouter.post('/', async (req, res) => {
  if (req.body.password === undefined || req.body.username === undefined) {
    return res.status(400).send({ error: 'password or username is missing' });
  }
  if (req.body.password.length < 3 || req.body.username.length < 3) {
    return res.status(400).send({ error: 'password or username too short' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = passwordHash;

  const newUser = new User(req.body);
  const result = await newUser.save();
  return res.status(201).json(result);
});

module.exports = userRouter;
