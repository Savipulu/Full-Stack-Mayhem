import React from "react";

const Otsikko = ({ koko, teksti }) => {
  switch (koko) {
    case 1:
      return <h1>{teksti}</h1>;
    case 2:
      return <h2>{teksti}</h2>;
    case 3:
      return <h3>{teksti}</h3>;
    case 4:
      return <h4>{teksti}</h4>;
    default:
      return <h1>{teksti}</h1>;
  }
};

export default Otsikko;
