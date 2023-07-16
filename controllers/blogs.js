const blogsRouter = require('express').Router();
const Blog = require('../models/blogdb');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      console.log(error.name);
      if (error.name === 'ValidationError') {
        response.status(400).end();
      }
    });
});

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).end();
});

blogsRouter.put('/:id', async (req,res) => {
  const response = await Blog.findByIdAndUpdate(req.params.id,req.body);
  res.status(200).send(response);
})

module.exports = blogsRouter;
