const express = require("express")
const router = express.Router()
const NewUser = require("../models/User")
const bcrypt = require("bcryptjs")
const users = require("../models/model")

router.get("/sign_in", function(req, res){
  res.render("welcome")
})

router.get("/sign_in", function(req,res){
  const username = req.body.username
  const password = req.body.password
  NewUser.findOne({username: username}).then(function(user){
    if (!user) {
      res.render("welcome", {
        message: "Incorrect login info!"
      })
    } else {
      if (bcrypt.compareSync(password, user.passwordHash)){
        req.session.user = user
        res.redirect("/")
      } else {
        res.render("welcome", {
          message: "Incorrect login info!"
        })
      }
    }
  })
})


module.exports = router
