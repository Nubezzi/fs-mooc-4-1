const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
require('express-async-errors')
const express = require('express')
const cors = require('cors')

blogsRouter.use(cors())
blogsRouter.use(express.json())

blogsRouter.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/api/blogs', async (request, response) => {
  try {
    if(!request.body.url || !request.body.title){
      return response.status(400).end()
    }
    const blog = new Blog(request.body)
    console.log(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = blogsRouter