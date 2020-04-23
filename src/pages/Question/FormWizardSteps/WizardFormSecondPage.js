import React from "react";
import { reduxForm, Field } from "redux-form";
import validate from "./validate";
import { Row, Col } from "reactstrap";
import Editor from "../../../components/Editor";

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;
  return <Editor />;
};

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormSecondPage);
