const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogdb');
const helper = require('./test_helper');

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((b)=> new Blog(b))
  const promiseArray = blogObjects.map((b)=> b.save())
  await Promise.all(promiseArray)
}, 20000);

test('notes are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(6);
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
