import React from "react";
import Kurssi from "./components/Kurssi";
import Otsikko from "./components/Otsikko";

const App = () => {
  const kaikkiKurssit = kurssit =>
    kurssit.map(k => <Kurssi key={k.id} kurssi={k} />);

  const kurssit = [
    {
      nimi: "Half Stack -sovelluskehitys",
      id: 1,
      osat: [
        {
          nimi: "Reactin perusteet",
          tehtavia: 10,
          id: 1
        },
        {
          nimi: "Tiedonvälitys propseilla",
          tehtavia: 7,
          id: 2
        },
        {
          nimi: "Komponenttien tila",
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: "Node.js",
      id: 2,
      osat: [
        {
          nimi: "Routing",
          tehtavia: 3,
          id: 1
        },
        {
          nimi: "Middlewaret",
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kaikkiKurssit(kurssit)}
    </div>
  );
};

export default App;
