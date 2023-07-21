const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/userdb');
const helper = require('./test_helper');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
}, 10000);

describe('post /api/users', () => {
  test('post request creates new user', async () => {
    const user = {
      name: 'test',
      username: 'root',
      password: 'testuser',
    };

    const result = await api.post('/api/users')
      .send(user)
      .expect(201);
    expect(result.body.name).toBe(user.name);
    expect(result.body.username).toBe(user.username);
  });

  test('user with no password or username is not created', async () => {
    const userWithNoUsername = {
      name: 'test',
      password: 'testUser',
    };

    const userWithNoPassword = {
      name: 'test',
      username: 'testuser',
    };

    let response = await api.post('/api/users')
      .send(userWithNoUsername)
      .expect(400);
    expect(response.body).toEqual({ error: 'password or username is missing' });

    response = await api.post('/api/users')
      .send(userWithNoPassword)
      .expect(400);
    expect(response.body).toEqual({ error: 'password or username is missing' });

  });

  test('user with username or password length less than 3 is not created', async () => {
    const userWithShortUsername = {
      name: 'test',
      username: 't',
      password: 'testUser',
    };

    const userWithShortPassword = {
      name: 'test',
      username: 'testuser',
      password: 't',
    };

    let response = await api.post('/api/users')
      .send(userWithShortUsername)
      .expect(400);
    expect(response.body).toEqual({ error: 'password or username too short' });

    response = await api.post('/api/users')
      .send(userWithShortPassword)
      .expect(400);
    expect(response.body).toEqual({ error: 'password or username too short' });
  });

  test('only unique usernames must be saved', async () => {
    const userOne = {
      username: 'testuser',
      name: 'test',
      password: 'mypwd',
    };
    const userTwo = {
      username: 'testuser',
      name: 'duplicate',
      password: 'mypwd1',
    };

    await api.post('/api/users')
      .send(userOne)
      .expect(201);

    let response = await api.post('/api/users')
      .send(userTwo)
      .expect(400);
    expect(response.body).toEqual({ error: 'username is already taken' });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
