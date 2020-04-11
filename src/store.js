import React, { useReducer } from "react";
import produce from "immer";

const initialState = {};
export const Store = React.createContext(initialState);

const reducer = produce((draft, action) => {
  switch (action.type) {
    default:
      return draft;
  }
});

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};

export default Provider;
