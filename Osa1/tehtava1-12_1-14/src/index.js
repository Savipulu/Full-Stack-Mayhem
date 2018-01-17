import React from 'react'
import ReactDOM from 'react-dom'

const Votecount = ({votes}) => {
  return (
    <p>has {votes} votes </p>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      best: "No anecdote voted yet",
      bestCount: 0,
      bestIndex: 0,
      voteList: []
    }
    anecdotes.forEach(() => this.state.voteList.push(0))
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  newAnecdote = (max) => {
    return () => {
      this.setState({
        selected: this.getRandomInt(max)
      })
    }
  }

  getBestAnecdote = () => {
    var biggestIndex = 0
    var biggest = 0
    for (var i = 0; i < this.state.voteList.length; i++) {
      if (this.state.voteList[i] > biggest) {
        biggest = this.state.voteList[i]
        biggestIndex = i
      }
    }
    const bestAnecdote = anecdotes[biggestIndex]
    console.log("Best: ", bestAnecdote)
    console.log("count:", biggest)
    console.log("from index:", biggestIndex)
    this.setState({
      best: bestAnecdote,
      bestCount: biggest,
      bestIndex: biggestIndex
    })
  }

  vote = () => {
    const voteList = this.state.voteList
    voteList[this.state.selected] += 1
    this.setState({
      voteList
    },
    this.getBestAnecdote()
  )
  }

  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          <Votecount votes={this.state.voteList[this.state.selected]} />
        </div>
        <div>
          <button onClick={this.vote}>vote</button>
          <button onClick={this.newAnecdote(6)}>next anecdote</button>
        </div>
        <div>
          <h2>anecdote with most votes:</h2>
          {this.state.best}
          <Votecount votes={this.state.voteList[this.state.bestIndex]} />
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)