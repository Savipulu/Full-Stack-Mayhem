import React from "react";
import Otsikko from "./Otsikko";

const Lomake = ({ id, title, submitMethod, fields, submitText }) => {
  const makeFields = () => {
    return (
      <div>
        {fields.map(field => (
          <div>
            {field.name}
            <input onChange={field.method} />
          </div>
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
