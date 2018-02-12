const mongoose = require('mongoose')

var schema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: Number(0) }
})

const Blog = mongoose.model('Blog', schema)

module.exports = Blog
