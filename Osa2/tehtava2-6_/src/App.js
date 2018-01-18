import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [{ name: "Arto Hellas" }],
      newName: ""
    };
  }

  lisaaNumero = event => {
    event.preventDefault();
    const newPerson = {
      name: this.state.newName
    };

    if (this.state.persons.find(person => person.name)) {
      alert("Henkilö löytyy jo puhelinluettelosta");
      return;
    }

    const persons = this.state.persons.concat(newPerson);

    this.setState({
      persons: persons,
      newName: ""
    });
  };

  muutettu = event => {
    this.setState({
      newName: event.target.value
    });
  };

  henkilot = () =>
    this.state.persons.map(person => <p key={person.name}>{person.name}</p>);

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.lisaaNumero}>
          <div>
            nimi: <input onChange={this.muutettu} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.henkilot()}
      </div>
    );
  }
}

export default App;
