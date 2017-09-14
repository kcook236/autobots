const express = require("express")
const router = express.Router()
const NewUser = require("../models/User")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")


router.get("/register", function(req, res){
  res.render("register")
})

router.post("/register", function(req, res){
  const email = req.body.email
  const password = req.body.password
  const user = new NewUser()
  user.email = email
  user.passwordHash = bcrypt.hashSync(password, 8)
  user.save().then(function(user){
    req.session.user = user
    res.redirect("/")
  })
  .catch(function(error){
    console.log("error", error)
    res.render("register", {
      user: user,
      errors: error.errors
    })
  })
})


module.exports = router
