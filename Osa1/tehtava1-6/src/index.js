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

const Palautteet = ({sovellus, vaihtoehdot}) => {
  return (
    <div>
      <Palaute teksti={vaihtoehdot[0]} lkm={sovellus.state.hyva} />
      <Palaute teksti={vaihtoehdot[1]} lkm={sovellus.state.neutraali} />
      <Palaute teksti={vaihtoehdot[2]} lkm={sovellus.state.huono} />
    </div>
  )
}

const Palaute = ({teksti, lkm}) => {
  return (
    <div>
      <p>{teksti}: {lkm}</p>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
    this.palauteOtsikko = "anna palautetta"
    this.statistiikkaOtsikko = "statistiikka"
    this.vaihtoehdot = ["hyvä", "neutraali", "huono"]
    this.funktiot = [this.klikHyva, this.klikNeutraali, this.klikHuono]
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  render() {
    return (
      <div>
        <Otsikko teksti={this.palauteOtsikko} />
        <Napit funktiot={this.funktiot} vaihtoehdot={this.vaihtoehdot} />
        <Otsikko teksti={this.statistiikkaOtsikko} />
        <Palautteet sovellus={this} vaihtoehdot={this.vaihtoehdot} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)