const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      _id: 1,
      username: 1,
      name: 1
    })
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (body.title === undefined) {
      return response.status(400).send({ error: 'title missing' })
    }
    if (body.url === undefined) {
      return response.status(400).send({ error: 'url missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved)
    await user.save()

    response.json(saved)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    }
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)

    if (blog.user !== undefined && blog.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'tokens do not match' })
    }

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
