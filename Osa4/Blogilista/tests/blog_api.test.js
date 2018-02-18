const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initBlogs, blogsInDb } = require('./test_helper')
const bcrypt = require('bcrypt')

describe('with a previously initialized blog database', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const passwordHash = await bcrypt.hash('Testisalasana', 10)
    const user = new User({
      username: 'Savipulu',
      name: 'Jouni Winter',
      passwordHash
    })
    await user.save()

    const blogObjects = initBlogs.map(blog => new Blog(blog))
    blogObjects.forEach(blog => (blog.user = user))
    await Promise.all(blogObjects.map(blog => blog.save()))
  })

  test('blogs are returned as json by GET /api/blogs', async () => {
    const blogs = await blogsInDb()
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogs.length)

    const contents = response.body.map(n => n.title)
    blogs.forEach(blog => {
      expect(contents).toContain(blog.title)
    })
  })

  describe('adding a blog', async () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Automated testing with async/await',
        author: 'Me',
        url: 'www.testingisthebest.com',
        likes: 9000
      }
      const blogsBeforePost = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterPost = await blogsInDb()

      expect(blogsAfterPost.length).toBe(blogsBeforePost.length + 1)
      expect(blogsAfterPost).toContainEqual(newBlog)
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

      const blogsAfterPost = await blogsInDb()
      const contents = blogsAfterPost.map(r => r.likes)

      expect(contents[blogsAfterPost.length - 1]).toBe(0)
    })

    test('blogs are not created without a valid url or title', async () => {
      const blogWithoutTitle = {
        url: 'Ghost Url',
        author: 'Ghost Writer',
        likes: 9000
      }

      const blogWithoutUrl = {
        title: 'Ghost Title',
        author: 'Ghost Writer',
        likes: 9000
      }

      const blogsBeforePost = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAfterPost = await blogsInDb()
      const contents = blogsAfterPost.map(r => r.author)

      expect(blogsAfterPost.length).toBe(blogsBeforePost.length)
      expect(contents).not.toContain('Ghost Writer')
    })
  })

  test('blog can be deleted', async () => {
    const newBlog = {
      title: 'Blog to be deleted',
      author: 'Apina 3',
      url: 'www.killyourdarlings.com',
      likes: 1
    }
    const blogsBeforeDeletion = await blogsInDb()

    const addedBlog = await api.post('/api/blogs').send(newBlog)

    await api.delete(`/api/blogs/${addedBlog.body._id}`).expect(204)

    const blogsAfterDeletion = await blogsInDb()

    const contents = blogsAfterDeletion.map(r => r.title)

    expect(contents).not.toContain('Blog to be deleted')
    expect(blogsAfterDeletion.length).toBe(blogsBeforeDeletion.length)
  })

  test('blog can be updated', async () => {
    const newBlog = {
      title: 'Blog to be updated',
      author: 'Apina 3',
      url: 'www.killyourdarlings.com',
      likes: 0
    }
    const addedBlog = await api.post('/api/blogs').send(newBlog)

    newBlog.likes = 2

    console.log(newBlog)

    await api
      .put(`/api/blogs/${addedBlog.body._id}`)
      .send(newBlog)
      .expect(200)

    const blogsAfterUpdate = await blogsInDb()

    const contents = blogsAfterUpdate.map(r => r.likes)

    expect(contents[contents.length - 1]).toBe(2)
  })

  afterAll(() => {
    server.close()
  })
})
