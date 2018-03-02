import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notify, clearNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  this.props.vote(anecdote.id)
                  this.props.notify(`you voted '${anecdote.content}'`)
                  setTimeout(() => this.props.clearNotification(), 5000)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = state => {
  return {
    anecdotes: filterAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vote: id => {
      dispatch(vote(id))
    },
    notify: value => {
      dispatch(notify(value))
    },
    clearNotification: () => dispatch(clearNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
