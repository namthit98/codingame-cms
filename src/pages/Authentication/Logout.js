import React, { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import store from "store-js";
import { logoutUser, loginSuccess } from "../../store/actions";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginSuccess(null));
    store.remove("user");
  }, []);
  return <Redirect to="/login" />;
};

export default withRouter(connect(null, { logoutUser, loginSuccess })(Logout));
