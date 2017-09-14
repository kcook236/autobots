const express = require("express")
const app = express()
const router = express.Router()
const users = require("../models/model")
//const session = require("express-session")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

const requireAuth = function(req, res, next){
  if (req.session.user){
    next()
  } else {
    res.redirect("/sign_in")
  }
}

router.get("/", requireAuth, function(req, res){
  console.log("We are connected!");
  const title = "Robo LinkedIn"
  users.find().then(function(users){
    res.render("index",  {
      title: title,
      users: users
  })
  })
})

router.get("/newUser", function(req,res){
  res.render("newUser")
})

router.post("/newUser", function(req, res){
  const name = req.body.name
  const avatar = req.body.avatar
  const email = req.body.email
  const phone = req.body.phone
  const university = req.body.university
  const job = req.body.job
  const skills = req.body.skills
  const user = new users()
  user.name = name
  user.avatar = avatar
  user.email = user
  user.phone = phone
  user.university = university
  user.job = job
  user.skills = skills
  user.save().then(function(user){
    res.redirect("/")
  })
  .catch(function(error){
    console.log("error", error);
    res.render("newUser", {
      user: user,
      error: error.errors
    })
  })
})

router.get("/users/:id", requireAuth, function(req, res){
  users.findOne({_id: req.params.id}).then(function(user){
    const name = req.body.name
    const avatar = req.body.avatar
    const email = req.body.email
    const phone = req.body.phone
    const university = req.body.university
    const job = req.body.job
    const skills = req.body.skills
    user.name = name
    user.avatar = avatar
    user.email = user
    user.phone = phone
    user.university = university
    user.job = job
    user.skills = skills
    user.save().then(function(user){
      res.redirect("/")
    })
    .catch(function(error){
      res.render("edit", {
        user: user,
        error: error.errors
      })
    })
  })
})

router.get("/users/:id", requireAuth, function(req, res){
  users.findOne({_id: req.params.id}).then(function(user){
    res.render("profile", {
      user:user
    })
  })
})


router.get("/users/:id/edit", requireAuth, function(req,res){
  users.findOne({_id: req.params.id}).then(function(user){
    res.render("edit", {
      user:user
    })
  })
})

router.get("/users/:id/delete", requireAuth, function(req,res){
  users.deleteOne({_id: req.params.id}).then(function(user){
    res.render("edit", {
      user:user
    })
  })
})

module.exports = router
