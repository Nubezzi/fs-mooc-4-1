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

const newBlog = {
    title: "testi",
    author: "asdad",
    url: "juuh.google.fi",
    likes: 10
}

const newBlog2 = {
    title: "testi",
    author: "asdad",
    url: "juuh.google.fi"
}
const newBlog3 = {
    author: "asdad",
    url: "juuh.google.fi",
    likes: 10
}
const newBlog4 = {
    title: "testi",
    author: "asdad",
    likes: 10
}

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

test('post adds a new blog', async () => {
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('post with no likes defined is handled correctly', async () => {
    let post = await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(201)

    const res = await api.get('/api/blogs')
    res.body.forEach((val) => {
        if (post.body.id == val.id){
            expect(val.likes).toEqual(0)
        }
    })
})

test('deleting post returns HTTP code 204', async () => {
    let post = await api
        .post('/api/blogs')
        .send(newBlog)

    await api
        .delete(`/api/blogs/${post.body.id}`)
        .expect(204)
})

describe('Handling missing url or title', () => {
    test('missing title is handled correctly', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog3)
            .expect(400)
    })
    test('missing url is handled correctly', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog4)
            .expect(400)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})

