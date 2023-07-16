const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/userdb');

userRouter.get('/', async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

userRouter.post('/', async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = passwordHash;
  const newUser = new User(req.body);
  const result = await newUser.save();
  res.status(201).json(result);
});

module.exports = userRouter;
