const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema and Model
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    min: [6, 'Minimum Character count is 6'],
    max: [255, 'Maximum Character count is 255']
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    min: [6, 'Minimum Character count is 6'],
    max: [255, 'Maximum Character count is 255']
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    min: [6, 'Minimum Character count is 6'],
    max: [1024, 'Maximum Character count is 1024']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
