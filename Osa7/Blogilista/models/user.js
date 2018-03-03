const mongoose = require('mongoose')

var schema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

const User = mongoose.model('User', schema)

module.exports = User
