import React, { useReducer } from "react";
import store from "store";
import produce from "immer";

const initialState = {
  authUser: store.get("authUser") ? JSON.parse(store.get("authUser")) : null,
};
export const Store = React.createContext(initialState);

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      store.set("authUser", JSON.stringify(action.payload));
      store.set("token", action.payload.token);
      draft.authUser = action.payload;
      return draft;
    }

    case "LOGOUT": {
      draft.authUser = null;
      return draft;
    }

    default:
      return draft;
  }
});

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};

export default Provider;
