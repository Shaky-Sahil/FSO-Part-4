const blogsRouter = require('express').Router();
const Blog = require('../models/blogdb');
const User = require('../models/userdb');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user',{username:1, name:1})
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const user = await User.findOne({ name: 'sahil' });
  console.log(`value of user is ${user}`);
  blog.user = user.id;
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id)
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const response = await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send(response);
});

module.exports = blogsRouter;
