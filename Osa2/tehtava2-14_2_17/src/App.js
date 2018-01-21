import React from "react";
import Luettelo from "./components/Luettelo";
import Lomake from "./components/Lomake";
import Otsikko from "./components/Otsikko";
import Tekstikentta from "./components/Tekstikentta";
import peopleService from "./services/people";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: ""
    };
  }

  componentWillMount() {
    console.log("component mounting");
    peopleService.getAll().then(people => {
      console.log("promise");
      this.setState({ persons: people });
    });
  }

  lisaaNumero = event => {
    event.preventDefault();
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    };
    const person = this.state.persons.find(p => p.name === newPerson.name);

    if (person) {
      if (
        window.confirm(
          newPerson.name +
            " löytyy jo puhelinluettelosta, korvataanko vanha numero uudella?"
        )
      ) {
        const changedPerson = { ...person, number: this.state.newNumber };
        const id = changedPerson.id;
        peopleService.update(id, changedPerson).then(response => {
          this.setState({
            persons: this.state.persons.map(
              person => (person.id !== id ? person : changedPerson)
            )
          });
        });
      }
      return;
    }
    peopleService.create(newPerson).then(newPerson => {
      this.setState({
        persons: this.state.persons.concat(newPerson),
        newName: "",
        newNumber: ""
      });
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

  poistaHenkilo = (id, person) => {
    return () => {
      if (
        window.confirm(
          "Haluatko varmasti poistaa henkilön " + person.name + "?"
        )
      ) {
        peopleService.erase(person.id).then(person => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id)
          });
        });
      }
    };
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
          <td>
            <button onClick={this.poistaHenkilo(person.id, person)}>
              Poista
            </button>
          </td>
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
        <Tekstikentta name="rajaa näytettäviä " method={this.rajaa} />
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
