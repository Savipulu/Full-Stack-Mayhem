import React from "react";

const Tekstikentta = ({ name, method }) => {
  return (
    <div>
      {name}
      <input onChange={method} />
    </div>
  );
};

export default Tekstikentta;
