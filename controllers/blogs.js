const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const express = require('express')
const cors = require('cors')

blogsRouter.use(cors())
blogsRouter.use(express.json())

blogsRouter.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.log("ööh")
  }
})

blogsRouter.post('/api/blogs', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    console.log(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    console.log('ööh2')
  }
})

module.exports = blogsRouter