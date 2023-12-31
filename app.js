const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const userRouter = require('./controllers/users');

app.use(cors());
app.use(express.json());

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl)
  .then(() => console.log('successfully connected to db'))
  .catch(() => console.log('error while connecting'));

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  console.log("error message is :");
  console.log(err.message);
  if (err.errors.username.kind === 'unique') {
    res.status(400);
    res.json({ error: 'username is already taken' });
  }
  next(err);
});

module.exports = app;
