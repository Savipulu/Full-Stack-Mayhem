import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./CounterReducer";

const Statistiikka = () => {
  const palautteita = 0;

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
            <td />
          </tr>
          <tr>
            <td>neutraali</td>
            <td />
          </tr>
          <tr>
            <td>huono</td>
            <td />
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td />
          </tr>
          <tr>
            <td>positiivisia</td>
            <td />
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div>
  );
};

const store = createStore(counterReducer);

class App extends React.Component {
  klik = nappi => () => {};

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

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
