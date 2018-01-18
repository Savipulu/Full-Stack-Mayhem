import React from "react";
import ReactDOM from "react-dom";

const Otsikko = ({ teksti }) => {
  return (
    <div>
      <h2>{teksti}</h2>
    </div>
  );
};

const Napit = ({ funktio, vaihtoehdot }) => {
  return (
    <div>
      <Button funktio={funktio([1, 0, 0])} teksti={vaihtoehdot[0]} />
      <Button funktio={funktio([0, 1, 0])} teksti={vaihtoehdot[1]} />
      <Button funktio={funktio([0, 0, 1])} teksti={vaihtoehdot[2]} />
    </div>
  );
};

const Button = ({ funktio, teksti }) => {
  return <button onClick={funktio}>{teksti}</button>;
};

const Statistics = ({ sovellus, vaihtoehdot, statistiikat }) => {
  return (
    <div>
      <table>
        <tbody>
          <Statistic teksti={vaihtoehdot[0]} arvo={sovellus.state.hyva} />
          <Statistic teksti={vaihtoehdot[1]} arvo={sovellus.state.neutraali} />
          <Statistic teksti={vaihtoehdot[2]} arvo={sovellus.state.huono} />
          <Statistic teksti={statistiikat[0]} arvo={sovellus.state.keskiarvo} />
          <Statistic
            teksti={statistiikat[1]}
            arvo={sovellus.state.positiivisia}
            yksikko="%"
          />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ teksti, arvo, yksikko }) => {
  return (
    <tr>
      <td width="42">{teksti}:</td>
      <td>
        {arvo}
        {yksikko}
      </td>
    </tr>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      palautemaara: 0,
      keskiarvo: 0,
      positiivisia: 0
    };
    this.palauteOtsikko = "anna palautetta";
    this.statistiikkaOtsikko = "statistiikka";
    this.vaihtoehdot = ["hyvä", "neutraali", "huono"];
    this.statistiikat = ["keskiarvo", "positiivisia"];
  }

  laskeKeskiarvo = () => {
    let summa = this.state.hyva + this.state.huono * -1;
    this.setState(
      {
        keskiarvo: (summa / this.state.palautemaara).toFixed(1)
      },
      this.laskePositiiviset
    );
  };

  laskePositiiviset = () => {
    this.setState({
      positiivisia: (this.state.hyva / this.state.palautemaara * 100).toFixed(2)
    });
  };

  kasvataArvoa = palaute => {
    return () => {
      this.setState(
        {
          hyva: this.state.hyva + palaute[0],
          neutraali: this.state.neutraali + palaute[1],
          huono: this.state.huono + palaute[2],
          palautemaara: this.state.palautemaara + 1
        },
        this.laskeKeskiarvo
      );
    };
  };

  render() {
    const statistiikka = () => {
      if (this.state.palautemaara === 0) {
        return (
          <div>
            <p>yhtään palautetta ei ole annettu</p>
          </div>
        );
      }
      return (
        <Statistics
          sovellus={this}
          vaihtoehdot={this.vaihtoehdot}
          statistiikat={this.statistiikat}
        />
      );
    };
    return (
      <div>
        <Otsikko teksti={this.palauteOtsikko} />
        <Napit funktio={this.kasvataArvoa} vaihtoehdot={this.vaihtoehdot} />
        <Otsikko teksti={this.statistiikkaOtsikko} />
        <div>{statistiikka()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
