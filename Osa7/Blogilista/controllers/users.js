const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', {
      _id: 1,
      likes: 1,
      author: 1,
      title: 1,
      url: 1
    })
    response.json(users)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      return response
        .status(400)
        .send({ error: 'password should be at least 3 characters long' })
    }

    const person = await User.find({ username: body.username })

    if (person.length > 0) {
      return response.status(400).send({ error: 'username should be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash
    })

    if (body.adult !== undefined) {
      user.adult = body.adult
    }

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter
