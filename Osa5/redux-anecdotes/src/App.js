import React from "react";
var _ = require("lodash");

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const actionFor = {
  voting(id) {
    return {
      type: "VOTE",
      data: { id }
    };
  },
  creatingAnecdote(content) {
    return {
      type: "NEW_ANECDOTE",
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    };
  }
};

class App extends React.Component {
  addAnecdote = event => {
    event.preventDefault();

    this.props.store.dispatch(actionFor.creatingAnecdote(this.input.value));
    this.input.value = "";
  };

  render() {
    const anecdotes = this.props.store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {_.sortBy(anecdotes, a => a.votes)
          .reverse()
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() =>
                    this.props.store.dispatch(actionFor.voting(anecdote.id))
                  }
                >
                  vote
                </button>
              </div>
            </div>
          ))}
        <h2>create new</h2>
        <form>
          <div>
            <input ref={input => (this.input = input)} />
          </div>
          <button onClick={this.addAnecdote}>create</button>
        </form>
      </div>
    );
  }
}

export default App;
