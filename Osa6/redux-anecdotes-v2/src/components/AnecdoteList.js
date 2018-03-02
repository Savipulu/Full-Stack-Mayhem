import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notify, clearNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes
          .filter(a =>
            a.content
              .toLowerCase()
              .includes(this.props.store.getState().filter.toLowerCase())
          )
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() => {
                    this.props.store.dispatch(vote(anecdote.id))
                    this.props.store.dispatch(
                      notify(`you voted '${anecdote.content}'`)
                    )
                    setTimeout(
                      () => this.props.store.dispatch(clearNotification()),
                      5000
                    )
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

export default AnecdoteList
