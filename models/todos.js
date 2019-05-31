const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema and Model
const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: {
    type: String,
    required: [true, 'Email field is required'],
    max: [255, 'Maximum Character count is 255']
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Todo', todoSchema)
