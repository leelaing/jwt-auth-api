const express = require('express')
const router = require("express").Router()
const Todo = require('../models/todos')

// Include this const to protext a route
const verify = require('./verifyToken')

// Get a list of Todos from the database
router.get("/", (req, res, next) => {
  Todo.create(req.body).then(function (todo) {
    res.send({
      type: 'GET',
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    })
  }).catch(next)
})

// Add a new Todo to the database
router.post("/", (req, res, next) => {
  Todo.create(req.body).then(function (todo) {
    res.send(todo)
  })

  // Update a single Todo in the database
  router.put("/:id", (req, res, next) => {
    res.send({ type: 'PUT' })
  })

  // Delete a single Todo from the database
  router.delete("/:id", (req, res, next) => {
    todos.findByIdAndRemove({ _id: req.params.id }).then(function (todo) {
      res.send(todo)
    })
  })
})
module.exports = router  
