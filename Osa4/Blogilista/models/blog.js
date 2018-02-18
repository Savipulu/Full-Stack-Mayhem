const mongoose = require('mongoose')

var schema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Blog = mongoose.model('Blog', schema)

module.exports = Blog
