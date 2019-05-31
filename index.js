require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
require('./models/auth')
const mongoose = require('mongoose')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

// Connect to DB
mongoose.connect(process.env.AUTH_URL,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to Users DB...')
  })
mongoose.Promise = global.Promise

// Import Routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const todosRoute = require('./routes/todos')

// Middleware
app.use(express.json())


// Initialize Routes
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/todos', todosRoute)

// Error Handling Middleware
app.use(function (err, rq, res, next) {
  // console.log(err)
  res.status(422).send({ error: err.message })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on Port ' + process.env.PORT)
})




