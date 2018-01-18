import React from "react";
import Osa from "./Osa";

const Sisalto = ({ kurssi }) => {
  const osat = () => kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />);

  return <div>{osat()}</div>;
};

export default Sisalto;
