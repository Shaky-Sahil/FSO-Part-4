const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

app.use(cors());
app.use(express.json());

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl)
  .then(() => console.log('successfully connected to db'))
  .catch(() => console.log('error while connecting'));

app.use('/api/blogs', blogsRouter);

module.exports = app;
