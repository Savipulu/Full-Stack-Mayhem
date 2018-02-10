const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

beforeAll(async () => {
  await Blog.remove({})
  const blogObjects = initBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initBlogs.length)
})

afterAll(() => {
  server.close()
})
