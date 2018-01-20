import React from "react";
import Otsikko from "./Otsikko";
import Tekstikentta from "./Tekstikentta";

const Lomake = ({ id, title, submitMethod, fields, submitText }) => {
  const makeFields = () => {
    return (
      <div>
        {fields.map(field => (
          <Tekstikentta name={field.name} method={field.method} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Otsikko koko={2} teksti={title} />
      <form id={id} onSubmit={submitMethod}>
        {makeFields()}
        <div>
          <button type="submit">{submitText}</button>
        </div>
      </form>
    </div>
  );
};

export default Lomake;
