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
      <Nappi
        funktio={funktiot[0]}
        teksti={vaihtoehdot[0]} 
      />
      <Nappi
        funktio={funktiot[1]}
        teksti={vaihtoehdot[1]} 
      />
      <Nappi
        funktio={funktiot[2]}
        teksti={vaihtoehdot[2]} 
      />
    </div>
  )
}

const Nappi = ({funktio, teksti}) => {
  return (
      <button onClick={funktio}>
        {teksti}
      </button>
  )
}

const Statistiikat = ({sovellus, vaihtoehdot, statistiikat}) => {
  return (
    <div>
      <Statistiikka teksti={vaihtoehdot[0]} arvo={sovellus.state.hyva} />
      <Statistiikka teksti={vaihtoehdot[1]} arvo={sovellus.state.neutraali} />
      <Statistiikka teksti={vaihtoehdot[2]} arvo={sovellus.state.huono} />
      <Statistiikka teksti={statistiikat[0]} arvo={sovellus.state.keskiarvo} />
      <Statistiikka teksti={statistiikat[1]} arvo={sovellus.state.positiivisia} yksikko="%"/>
    </div>
  )
}

const Statistiikka = ({teksti, arvo, yksikko}) => {
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
    let jakaja = this.state.hyva + this.state.neutraali + this.state.huono
    if (jakaja === 0) {
      jakaja = 1
    }
    this.setState({
      keskiarvo: (summa / jakaja).toFixed(1)
    },
    this.laskePositiiviset
    )
    console.log(this.state.keskiarvo)
  }

  laskePositiiviset = () => {
    let kaikki = this.state.hyva + this.state.neutraali + this.state.huono
    this.setState({
      positiivisia: ((this.state.hyva / kaikki) * 100).toFixed(2)
    })
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    },
    this.laskeKeskiarvo
  )}

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    },
    this.laskeKeskiarvo
  )}

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    },
    this.laskeKeskiarvo
  )}

  render() {
    return (
      <div>
        <Otsikko teksti={this.palauteOtsikko} />
        <Napit funktiot={this.funktiot} vaihtoehdot={this.vaihtoehdot} />
        <Otsikko teksti={this.statistiikkaOtsikko} />
        <Statistiikat sovellus={this} vaihtoehdot={this.vaihtoehdot} statistiikat={this.statistiikat} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)