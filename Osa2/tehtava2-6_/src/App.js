import React from "react";
import Luettelo from "./components/Luettelo";
import Lomake from "./components/Lomake";
import Otsikko from "./components/Otsikko";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Martti Tienari", number: "040-123456" },
        { name: "Arto Järvinen", number: "040-123456" },
        { name: "Lea Kutvonen", number: "040-123456" }
      ],
      newName: "",
      newNumber: "",
      filter: ""
    };
  }

  lisaaNumero = event => {
    event.preventDefault();
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    };

    if (this.state.persons.find(person => person.name === newPerson.name)) {
      alert("Henkilö löytyy jo puhelinluettelosta");
      return;
    }

    const persons = this.state.persons.concat(newPerson);

    this.setState({
      persons: persons,
      newName: "",
      newNumber: ""
    });
    document.getElementById("addPersonForm").reset();
  };

  nimiMuutettu = event => {
    this.setState({
      newName: event.target.value
    });
  };

  numeroMuutettu = event => {
    this.setState({
      newNumber: event.target.value
    });
  };

  henkilot = () =>
    this.state.persons
      .filter(person =>
        person.name.toLowerCase().includes(this.state.filter.toLowerCase())
      )
      .map(person => (
        <tr key={person.name}>
          <td>{person.name} </td>
          <td>{person.number}</td>
        </tr>
      ));

  rajaa = event => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Otsikko teksti="Puhelinluettelo" />
        <div>
          rajaa näytettäviä <input onChange={this.rajaa} />
        </div>
        <Lomake
          id="addPersonForm"
          title="Lisää uusi"
          submitText="lisää"
          submitMethod={this.lisaaNumero}
          fields={[
            { name: "nimi", method: this.nimiMuutettu },
            { name: "numero", method: this.numeroMuutettu }
          ]}
        />
        <Luettelo otsikko="Numerot" sisalto={this.henkilot()} />
      </div>
    );
  }
}

export default App;
