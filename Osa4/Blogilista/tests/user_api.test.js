const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

describe('user creation', async () => {
  beforeAll(async () => {
    await User.remove({})
  })

  test('does not succeed with a password shorter than 3 characters', async () => {
    const userWithABadPassword = {
      username: 'user',
      name: 'name',
      adult: true,
      password: 'a'
    }

    const response = await api
      .post('/api/users')
      .send(userWithABadPassword)
      .expect(400)
  })

  test('succeeds with valid information', async () => {
    const user = {
      username: 'Test User',
      name: 'name',
      adult: false,
      password: 'validPassword'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('does not succeed if the username is not unique', async () => {
    const userWithSameUsername = {
      username: 'Test User',
      name: 'Another Name',
      password: 'otherPassword'
    }

    const response = await api
      .post('/api/users')
      .send(userWithSameUsername)
      .expect(400)
  })

  afterAll(() => {
    server.close()
  })
})
