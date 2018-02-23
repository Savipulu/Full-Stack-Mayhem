import React from "react";

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GOOD":
      const g = state.good + 1;
      newState = { ...state, good: g };
      return newState;
    case "OK":
      const o = state.ok + 1;
      newState = { ...state, ok: o };
      return newState;
    case "BAD":
      const b = state.bad + 1;
      newState = { ...state, bad: b };
      return newState;
    case "ZERO":
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
