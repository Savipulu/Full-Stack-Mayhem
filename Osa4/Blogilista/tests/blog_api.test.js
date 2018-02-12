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

test('blogs can be created', async () => {
  const newBlog = {
    title: 'Automated testing with async/await',
    author: 'Me',
    url: 'www.testingisthebest.com',
    likes: 9000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(initBlogs.length + 1)
  expect(contents).toContain('Automated testing with async/await')
})

test('blogs have a default like value of 0', async () => {
  const newBlog = {
    title: 'Automated testing with async/await, part 2',
    author: 'Me Again',
    url: 'www.testingisthebest.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)

  expect(contents[response.body.length - 1]).toBe(0)
})

test('blogs are not created without a valid url or title', async () => {
  const newBlog = {
    author: 'Ghost Writer',
    likes: 9000
  }

  const blogsBeforePost = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  expect(response.body.length).toBe(blogsBeforePost.body.length)
  expect(contents).not.toContain('Ghost Writer')
})

/*
test('blog can be deleted', async () => {
  const newBlog = {
    title: 'Automated testing with async/await',
    author: 'Me',
    url: 'www.testingisthebest.com',
    likes: 9000
  }

  const addedBlog = await api.post('/api/blogs').send(newBlog)

  const blogsBeforeDeletion = await api.get('/api/blogs')

  await api.delete(`/api/blogs/${addedBlog.body.id}`).expect(204)

  const blogsAfterDeletion = await api.get('/api/blogs')

  const contents = blogsAfterDeletion.body.map(r => r.content)

  expect(contents).not.toContain('Automated testing with async/await')
  expect(blogsAfterDeletion.body.length).toBe(blogsBeforeDeletion.body.length)
})
*/

afterAll(() => {
  server.close()
})
