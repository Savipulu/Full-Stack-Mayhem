import React from "react";

const Yhteensa = ({ kurssi }) => {
  const tehtavia = kurssi.osat.reduce((summa, osa) => summa + osa.tehtavia, 0);

  return (
    <div>
      <p>yhteensä {tehtavia} tehtävää</p>
    </div>
  );
};

export default Yhteensa;
