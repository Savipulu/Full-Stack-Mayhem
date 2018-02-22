import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  notification,
  login,
  handleChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Kirjaudu sovellukseen</h2>
      <Notification message={notification} notificationType="alert" />
      <form onSubmit={login}>
        <div>
          Käyttäjätunnus:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          Salasana:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
