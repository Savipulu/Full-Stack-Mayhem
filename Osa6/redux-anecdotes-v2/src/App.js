import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.initAnecdotes()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(null, { initAnecdotes })(App)
