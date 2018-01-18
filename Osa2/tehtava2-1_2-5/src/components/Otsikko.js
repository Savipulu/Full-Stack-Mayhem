import React from "react";

const Otsikko = ({ kurssi }) => {
  return (
    <div>
      <h1>{kurssi.nimi}</h1>
    </div>
  );
};

export default Otsikko;
