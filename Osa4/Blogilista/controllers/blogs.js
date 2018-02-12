const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    if (request.body.title === undefined) {
      return response.status(400).send({ error: 'title missing' })
    }
    if (request.body.url === undefined) {
      return response.status(400).send({ error: 'url missing' })
    }
    const blog = new Blog(request.body)
    const saved = await blog.save()
    response.json(blog)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

module.exports = blogsRouter
