import React from "react";
import Luettelo from "./components/Luettelo";
import Lomake from "./components/Lomake";
import Otsikko from "./components/Otsikko";
import Tekstikentta from "./components/Tekstikentta";
import peopleService from "./services/people";
import Notifier from "./components/Notifier";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: "",
      notify: null
    };
  }

  componentWillMount() {
    console.log("component mounting");
    peopleService.getAll().then(people => {
      console.log("promise");
      this.setState({ persons: people });
    });
  }

  setNotificationTimeout = () => {
    setTimeout(() => {
      this.setState({ notify: null });
    }, 3000);
  };

  lisaaNumero = event => {
    event.preventDefault();
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    };
    document.getElementById("addPersonForm").reset();
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
        peopleService
          .update(id, changedPerson)
          .then(response => {
            this.setState(
              {
                newName: "",
                newNumber: "",
                persons: this.state.persons.map(
                  person => (person.id !== id ? person : changedPerson)
                ),
                notify: "Henkilön " + changedPerson.name + " tiedot muutettu"
              },
              this.setNotificationTimeout
            );
          })
          .catch(error => {
            this.luoHenkilo(changedPerson);
            this.componentWillMount();
          });
      }
      return;
    }
    this.luoHenkilo(newPerson);
  };

  nimiMuutettu = event => {
    this.setState({
      newName: event.target.value
    });
  };

  luoHenkilo = newPerson => {
    peopleService.create(newPerson).then(newPerson => {
      this.setState(
        {
          persons: this.state.persons.concat(newPerson),
          newName: "",
          newNumber: "",
          notify: "Lisättiin " + newPerson.name
        },
        this.setNotificationTimeout
      );
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
          this.setState(
            {
              persons: this.state.persons.filter(p => p.id !== id),
              notify: "Henkilö poistettu onnistuneesti"
            },
            this.setNotificationTimeout
          );
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
        <Notifier message={this.state.notify} />
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
