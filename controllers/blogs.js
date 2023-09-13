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

blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
    console.log(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter