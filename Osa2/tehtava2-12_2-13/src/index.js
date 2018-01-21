import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      all: [],
      found: []
    };
  }

  componentWillMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({
        all: response.data
      });
    });
  }

  searchWordChanged = event => {
    this.setState(
      {
        filter: event.target.value
      },
      this.handleResults
    );
  };

  handleResults = event => {
    const f = this.state.all;
    this.setState({
      found: f.filter(country =>
        country.name.toLowerCase().includes(this.state.filter.toLowerCase())
      )
    });
  };

  setCountry = event => {
    this.setState(
      {
        filter: event.target.textContent
      },
      this.handleResults
    );
  };

  showCountry = () => {
    return this.state.found.map(country => (
      <div key="found">
        <h1>
          {country.name} {country.nativeName}
        </h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <div key="flag">
          <img src={country.flag} width={300} alt="flag" />
        </div>
      </div>
    ));
  };

  listCountries = () => {
    return this.state.found.map(country => (
      <div key={country.alpha3Code} onClick={this.setCountry}>
        {country.name}
      </div>
    ));
  };

  countries = () => {
    if (this.state.found.length === 0) {
      return;
    }
    if (this.state.found.length === 1) {
      return <div>{this.showCountry()}</div>;
    }
    if (this.state.found.length <= 10) {
      return <div>{this.listCountries()}</div>;
    }
    return <p>too many matches, specify another filter</p>;
  };

  render() {
    return (
      <div>
        find countries: <input onChange={this.searchWordChanged} />
        {this.countries()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
