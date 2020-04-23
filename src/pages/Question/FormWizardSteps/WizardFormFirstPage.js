import React from "react";
import { reduxForm, Field } from "redux-form";
import validate from "./validate";
import { Row, Col } from "reactstrap";

// Form Editor
import { Editor } from "react-draft-wysiwyg";

const renderEditor = (field) => {
//   const onEditorStateChange = (editorState) => {
//     field.input.onChange(editorState);
//   };
  return (
    <Editor
    //   editorState={field.input.value}
    //   onEditorStateChange={onEditorStateChange}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="question-description-editor"
    />
  );
};

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} lg={8}>
          <Field name="description" component={renderEditor} />
        </Col>
        <Col xs={12} lg={4}>
          <Row>
            <Col md={12}>
              <div className="form-group row">
                <label
                  htmlFor="txtFirstNameShipping"
                  className="col-lg-3 col-form-label"
                >
                  Title
                </label>
                <Col lg={9}>
                  <Field
                    id="txtFirstNameShipping"
                    name="txtFirstNameShipping"
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
            </Col>

            <Col md={12}>
              <div className="form-group row">
                <label
                  htmlFor="ddlCreditCardType"
                  className="col-lg-3 col-form-label"
                >
                  Difficult
                </label>
                <Col lg={9}>
                  <Field
                    id="ddlCreditCardType"
                    name="ddlCreditCardType"
                    className="form-control"
                    component="select"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Field>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFirstPage);
