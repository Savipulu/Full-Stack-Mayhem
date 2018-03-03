import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import BlogCreationForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.css'
var _ = require('lodash')

const Blogs = ({ blogs, user, parent }) => {
  return blogs.map(blog => (
    <Blog key={blog._id} blog={blog} currentUser={user} parent={parent} />
  ))
}

const Users = ({ users }) => {
  return (
    <div>
      <h2>users</h2>
      <table>
        <tr>
          <th />
          <th>blogs added</th>
        </tr>
        {users.map(user => (
          <tr>
            <td>
              <Link to={`/users/${user._id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const User = ({ user }) => {
  if (user === undefined) {
    return <div>no user found</div>
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog._id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      currentUser: null,
      users: [],
      notification: null
    }
  }

  async componentDidMount() {
    const b = await blogService.getAll()
    const u = await userService.getAll()
    this.setState({ blogs: b, users: u })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ currentUser: user })
      blogService.setToken(user.token)
    }
  }

  createBlog = async event => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
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

  like = async id => {
    try {
      const blog = this.state.blogs.find(b => b._id === id)
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.updateBlog(likedBlog)
      this.setState({
        blogs: this.state.blogs.map(
          b => (b._id === likedBlog._id ? likedBlog : b)
        )
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  delete = async id => {
    try {
      const blog = this.state.blogs.find(b => b._id === id)
      await blogService.deleteBlog(blog)
      this.setState({
        blogs: this.state.blogs.filter(b => b._id !== blog._id)
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  logout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  say = word => {
    console.log(word)
  }

  getBlogs = () => {
    return _.sortBy(this.state.blogs, b => b.likes).reverse()
  }

  getUsers = async () => {
    const users = await userService.getAll()
    return users
  }

  render() {
    const userById = id => {
      return this.state.users.find(user => user._id === id)
    }
    if (this.state.currentUser === null) {
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
        <Router>
          <div>
            <h2>blogs</h2>
            <Notification
              message={this.state.notification}
              notificationType="success"
            />
            <p>
              {this.state.currentUser.name} logged in{' '}
              <button onClick={this.logout}>logout</button>
            </p>
            <Togglable
              buttonLabel="Create blog"
              ref={component => (this.blogForm = component)}
            >
              <BlogCreationForm submitMethod={this.createBlog} />
            </Togglable>
            <div>
              <Route
                exact
                path="/"
                render={() => (
                  <Blogs
                    blogs={this.getBlogs()}
                    user={this.state.currentUser}
                    parent={this}
                  />
                )}
              />
              <Route
                exact
                path="/users"
                render={() => <Users users={this.state.users} />}
              />
              <Route
                exact
                path="/users/:id"
                render={({ match }) => (
                  <User user={userById(match.params.id)} />
                )}
              />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
