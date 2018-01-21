import React from "react";
import Otsikko from "./Otsikko";

const Luettelo = ({ otsikko, sisalto }) => {
  return (
    <div>
      <Otsikko koko={2} teksti={otsikko} />
      <table key="p">
        <tbody>{sisalto}</tbody>
      </table>
    </div>
  );
};

export default Luettelo;
