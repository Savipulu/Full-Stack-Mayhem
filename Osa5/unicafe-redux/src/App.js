import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./CounterReducer";
var _ = require("lodash");

const Statistiikka = () => {
  const palautteita = Object.keys(store.getState())
    .map(a => store.getState()[a])
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>
              {_.round(
                (store.getState().good - store.getState().bad) / palautteita,
                2
              )}
            </td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{_.round(store.getState().good / palautteita * 100, 2)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: "ZERO" })}>
        nollaa tilasto
      </button>
    </div>
  );
};

const store = createStore(counterReducer);

class App extends React.Component {
  klik = nappi => () => {
    store.dispatch({ type: nappi });
  };

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik("GOOD")}>hyvä</button>
        <button onClick={this.klik("OK")}>neutraali</button>
        <button onClick={this.klik("BAD")}>huono</button>
        <Statistiikka />
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
render();
store.subscribe(render);

export default App;
