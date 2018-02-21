import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogCreationForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
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
    this.noteForm.toggleVisibility()
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
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
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
        <LoginForm
          notification={this.state.notification}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          login={this.login}
        />
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
        <Togglable
          buttonLabel="Create blog"
          ref={component => (this.blogForm = component)}
        >
          <BlogCreationForm submitMethod={this.createBlog} />
        </Togglable>
        <div>{this.showBlogs()}</div>
      </div>
    )
  }
}

export default App