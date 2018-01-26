import React from "react";

const Notifier = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notifier">{message}</div>;
};

export default Notifier;
