import React from "react";
import { reduxForm, Field, change } from "redux-form";
import validate from "./validate";
import { Row, Col } from "reactstrap";
import Editor from "../../../components/Editor";

const renderEditor = (field) => {
  const onEditorStateChange = (newValue) => {
    field.input.onChange(newValue);
  };
  return <Editor value={field.input.value} onChange={onEditorStateChange} />;
};

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      // console.log(text);
      // alert(text);
      props.dispatch(change('wizard', 'coding', text));
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <Row>
      <Col xs={12} lg={8}>
        <Field name="coding" component={renderEditor} />
      </Col>
      <Col xs={12} lg={4}>
        <Row>
          <Col md={12}>
            <div className="form-group row">
              <label
                htmlFor="txtFirstNameShipping"
                className="col-lg-3 col-form-label"
              >
                Coding
              </label>
              <Col lg={9}>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={(e) => showFile(e)}
                    accept=".js"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose file
                  </label>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(WizardFormSecondPage);
