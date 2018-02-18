import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogCreationForm from './components/BlogForm'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  createBlog = async event => {
    event.preventDefault()
    const blogTitle = event.target.title.value
    const blogAuthor = event.target.author.value
    const blogUrl = event.target.url.value
    event.target.reset()

    try {
      const newBlog = await blogService.createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })

      const blogs = this.state.blogs.concat(newBlog)
      this.setState({
        blogs: blogs,
        notification: `a new blog '${blogTitle}' by ${blogAuthor} added`
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      console.log(exception)
      this.setState({ notification: 'wrong username and/or password' })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    }
  }

  logout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  showBlogs = () => {
    return this.state.blogs.map(blog => <Blog key={blog._id} blog={blog} />)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <Notification
            message={this.state.notification}
            notificationType="alert"
          />
          <form onSubmit={this.login}>
            <div>
              Käyttäjätunnus:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              Salasana:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification
          message={this.state.notification}
          notificationType="success"
        />
        <p>
          {this.state.user.name} logged in{' '}
          <button onClick={this.logout}>logout</button>
        </p>
        <BlogCreationForm submitMethod={this.createBlog} />
        <div>{this.showBlogs()}</div>
      </div>
    )
  }
}

export default App
