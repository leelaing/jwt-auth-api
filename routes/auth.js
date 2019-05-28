const router = require('express').Router()
const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
  // Joi Validate
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if User exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email already exists...')

  // Password Hashing
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  // Joi Validate
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if User exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid Email or Password')

  // Verify Password
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid Email or Password')

  // Create JWT Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router;
