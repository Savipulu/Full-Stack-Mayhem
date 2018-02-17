const mongoose = require('mongoose')

var schema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: { type: Boolean, default: false }
})

const User = mongoose.model('User', schema)

module.exports = User
