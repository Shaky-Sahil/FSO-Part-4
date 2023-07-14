const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogdb');
const helper = require('./test_helper');

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
}, 20000);

describe('get /api/blogs',() => {
  test('notes are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(6);
  }, 20000);
  
  test('verify that unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
  

})

test('POST request successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'new blog for testing',
    author: 'Robert',
    url: 'http://blog.cleancoder.com/uncle-bob/',
    likes: 2,
  };
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201);
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  const content = response.body.map((b)=>b.title)
  expect(content).toContain(newBlog.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
