const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
.then(()=>console.log("successfully connected to db"))
.catch(()=>console.log("error while connecting"))

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)

module.exports = app