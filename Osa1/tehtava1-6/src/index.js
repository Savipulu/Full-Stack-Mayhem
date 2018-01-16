import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({teksti}) => {
  return (
    <div>
      <h2>{teksti}</h2>
    </div>
  )
}

const Napit = ({funktiot, vaihtoehdot}) => {
  return (
    <div>
      <Button
        funktio={funktiot[0]}
        teksti={vaihtoehdot[0]} 
      />
      <Button
        funktio={funktiot[1]}
        teksti={vaihtoehdot[1]} 
      />
      <Button
        funktio={funktiot[2]}
        teksti={vaihtoehdot[2]} 
      />
    </div>
  )
}

const Button = ({funktio, teksti}) => {
  return (
      <button onClick={funktio}>
        {teksti}
      </button>
  )
}

const Statistics = ({sovellus, vaihtoehdot, statistiikat}) => {
  return (
    <div>
      <Statistic teksti={vaihtoehdot[0]} arvo={sovellus.state.hyva} />
      <Statistic teksti={vaihtoehdot[1]} arvo={sovellus.state.neutraali} />
      <Statistic teksti={vaihtoehdot[2]} arvo={sovellus.state.huono} />
      <Statistic teksti={statistiikat[0]} arvo={sovellus.state.keskiarvo} />
      <Statistic teksti={statistiikat[1]} arvo={sovellus.state.positiivisia} yksikko="%"/>
    </div>
  )
}

const Statistic = ({teksti, arvo, yksikko}) => {
  return (
    <div>
      <p>{teksti}: {arvo}{yksikko}</p>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      palautemaara: 0,
      keskiarvo: 0,
      positiivisia: 0
    }
    this.palauteOtsikko = "anna palautetta"
    this.statistiikkaOtsikko = "statistiikka"
    this.vaihtoehdot = ["hyvä", "neutraali", "huono"]
    this.statistiikat = ["keskiarvo", "positiivisia"]
    this.funktiot = [this.klikHyva, this.klikNeutraali, this.klikHuono]
  }

  laskeKeskiarvo = () => {
    let summa = this.state.hyva + (this.state.huono * -1)
    this.setState({
      keskiarvo: (summa / this.state.palautemaara).toFixed(1)
    },
    this.laskePositiiviset
    )
    console.log(this.state.keskiarvo)
  }

  laskePositiiviset = () => {
    this.setState({
      positiivisia: ((this.state.hyva / this.state.palautemaara) * 100).toFixed(2)
    })
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      palautemaara: this.state.palautemaara + 1
    },
    this.laskeKeskiarvo
  )}

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
      palautemaara: this.state.palautemaara + 1
    },
    this.laskeKeskiarvo
  )}

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
      palautemaara: this.state.palautemaara + 1
    },
    this.laskeKeskiarvo
  )}

  render() {
    const statistiikka = () => {
      if (this.state.palautemaara === 0) {
        return (
          <div>
            <p>yhtään palautetta ei ole annettu</p>
          </div>
        )
      }
      return (
        <Statistics sovellus={this} vaihtoehdot={this.vaihtoehdot} statistiikat={this.statistiikat} />
      )
    }
    return (
      <div>
        <Otsikko teksti={this.palauteOtsikko} />
        <Napit funktiot={this.funktiot} vaihtoehdot={this.vaihtoehdot} />
        <Otsikko teksti={this.statistiikkaOtsikko} />
        <div>{statistiikka()}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)