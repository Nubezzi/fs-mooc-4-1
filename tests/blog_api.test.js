const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "650216c39289be732edf9eac",
        title: "kikkare",
        author: "peppu",
        url: "jtn.homo.com",
        likes: 5,
        __v: 0
    },
    {
        _id: "650216d19289be732edf9eae",
        title: "tökls",
        author: "asdad",
        url: "juuh.google.fi",
        likes: 5,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct num of blogs returned', async () => {
    let res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
})

test('id is correctly formated as "id" not "_id"', async () => {
    let res = await api.get('/api/blogs')
    res.body.forEach((val) => expect(val.id).toBeDefined())
})

test('post adds a new blog', async () => {
    const newBlog = {
        title: "testi",
        author: "asdad",
        url: "juuh.google.fi",
        likes: 10,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})

