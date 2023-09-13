const config = require('./utils/configs')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use('', blogsRouter)

module.exports = app