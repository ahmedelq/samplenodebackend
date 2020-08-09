const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user.js');
const app = require('../app');

const api = supertest(app);
const initUsers = [{
  username: 'jsm', name: 'John Smith', passwdHashed: '123456',
}, {
  username: 'xyz', name: 'Adam Jones', passwdHashed: '123456',
},
{
  username: 'abcd', name: 'Jorgen Hoffmann', passwdHashed: 'xy;z',
}, {
  username: 'goog', name: 'Tom Anderson', passwdHashed: '98kd12',
}];
beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initUsers);
});

describe('User Registeration', () => {
  test('Unique User', async () => {
    const newUser = {
      username: 'xyz',
      name: 'test',
      password: '123424',
    };
    await api
      .post('/api/user')
      .send(newUser)
      .expect(400);
    const res = await User.find({});
    expect(res).toHaveLength(initUsers.length);
  });
  test('Require username', async () => {
    const newUser = {
      username: null,
      name: 'test',
      password: '123424',
    };
    await api
      .post('/api/user')
      .send(newUser)
      .expect(400);
  });
  test('Username charachter length', async () => {
    const newUser = {
      username: 'uniuqe',
      name: 'te',
      password: '123424',
    };
    await api
      .post('/api/user')
      .send(newUser)
      .expect(400);
  });
});
afterAll(() => mongoose.connection.close());
