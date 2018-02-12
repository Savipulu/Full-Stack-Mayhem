const Blog = require('../models/blog')

const initBlogs = [
  {
    title: 'Full Stack Development',
    author: 'Apina1',
    url: 'www.poehinae.com',
    likes: 666
  },
  {
    title: 'Web-kehitys Javalla',
    author: 'Apina2',
    url: 'www.asdasd.com',
    likes: 0
  }
]

const format = blog => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initBlogs,
  format,
  nonExistingId,
  blogsInDb
}
