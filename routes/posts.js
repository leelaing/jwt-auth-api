const router = require("express").Router()
const verify = require('./verifyToken')

router.get("/", verify, (req, res) => {
  // res.send(req.user)
  res.json({
    posts: {
      title: "My First Post",
      description: "This is the description for my first post"
    }
  })
})


module.exports = router;
