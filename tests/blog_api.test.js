const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/Blog.js');
const app = require('../app');

const api = supertest(app);
const initBlogs = [{"title":"test","author":"test","url":"http://","likes":5,"id":"5f1db1da8d090ddb54ed5ccf"},{"title":"test","author":"test","url":"http://","likes":5,"id":"5f1db2098d090ddb54ed5cd0"},{"title":"The Atomic Habits","author":"James Clear","url":"http://","likes":42,"id":"5f1db2228d090ddb54ed5cd1"},{"title":"The Herd","author":"John Smith","url":"http://","likes":53,"id":"5f1db33ca0058fdd0c8f8a62"}];

beforeEach(async () => {
await Blog.deleteMany({});
await Blog.insertMany(initBlogs);
});
describe('API test', () => {
    test('Testing /api/blogs', async () => {
       await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    test('Testing the id object exists', async () => {
        const response = await api.get('/api/blogs');
        response.body.map(r => { 
            r.id.toBeDefined();
            r._id.not.toBeDefined();
            r.__v.not.toBeDefined();
        });
    }); 
    test('POST REQ.', async () => {
        const newBlogEntry = {
            title: 'Hello world',
            author: 'Abu Ali',
            url: 'https://',
            likes: 42
        }
        await api
                .post('/api/blogs')
                .send(newBlogEntry)
            .except(200)
            .except('Content-Type', /application\/json/);
        
    });
});

afterAll(()=> mongoose.connection.close());
