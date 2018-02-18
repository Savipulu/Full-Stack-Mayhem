import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      //setToken
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
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      console.log(exception)
    }
  }

  logout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
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
        <p>
          {this.state.user.name} logged in{' '}
          <button onClick={this.logout}>logout</button>
        </p>
        {this.state.blogs.map(blog => <Blog key={blog._id} blog={blog} />)}
      </div>
    )
  }
}

export default App
