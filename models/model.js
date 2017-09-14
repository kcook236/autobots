const mongoose = require("mongoose")

const newUsers = new mongoose.Schema({
  name: String,
  username: String,
  avatar: String,
  email: String,
  password: String,
  university: String,
  phone: String,
  company: String,
  job: String,
  skills: String
})

const users = mongoose.model("users", newUsers)


module.exports = users
