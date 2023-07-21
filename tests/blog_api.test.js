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

describe('get /api/blogs', () => {
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
});

describe('post /api/blogs', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
    const promiseArray = blogObjects.map((b) => b.save());
    await Promise.all(promiseArray);
  }, 20000);
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
    const content = response.body.map((b) => b.title);
    expect(content).toContain(newBlog.title);
  });

  test('if request made with no likes, likes is set to 0', async () => {
    const blogWithNoLikes = {
      title: 'blog with no likes',
      author: 'Robert',
      url: 'http://blog.cleancoder.com/uncle-bob/',
    };
    const response = await api.post('/api/blogs')
      .send(blogWithNoLikes)
      .expect(201);
    expect(response.body.likes).toBe(0);
  });

  test('if request made with no title or url status 400 returned', async () => {
    const blogWithNoTitle = {
      author: 'Robert',
      url: 'http://blog.cleancoder.com/uncle-bob/',
    };
    await api.post('/api/blogs')
      .send(blogWithNoTitle)
      .expect(400);
    const blogWithNoUrl = {
      title: 'blog with no likes',
      author: 'Robert',
    };
    await api.post('/api/blogs')
      .send(blogWithNoTitle)
      .expect(400);
  });
});

describe('delete /api/blogs/:id', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
    const promiseArray = blogObjects.map((b) => b.save());
    await Promise.all(promiseArray);
  }, 20000);

  test('deleting an element reduces length of blogs by', async () => {
    let response = await api.get('/api/blogs')
      .expect(200);
    await api.delete(`/api/blogs/${response.body[0].id}`)
      .expect(200);
    response = await api.get('/api/blogs')
      .expect(200);
    expect(response.body).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe('put /api/blogs/:id', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
    const promiseArray = blogObjects.map((b) => b.save());
    await Promise.all(promiseArray);
  }, 20000);

  test('updating likes returnes updated like', async () => {
    let response = await api.get('/api/blogs')
      .expect(200);
    await api.put(`/api/blogs/${response.body[0].id}`)
    .send({likes:10})
      .expect(200);
    response = await api.get('/api/blogs')
      .expect(200);
    
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});