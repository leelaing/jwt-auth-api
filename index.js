require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
require('./models/auth')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.json())

// Connect to DB
mongoose.connect(process.env.AUTH_URL,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to Users DB...')
  })

// Import Routes
const authRoute = require('./routes/auth')

// Middleware
app.use(express.json())


// Route Middleware
app.use('/api/user', authRoute)

app.listen(process.env.PORT || 3001, function () {
  console.log('Server running on Port ' + process.env.PORT)
})




