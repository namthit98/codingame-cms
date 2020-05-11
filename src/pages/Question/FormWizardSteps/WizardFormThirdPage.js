import React, { useState, useRef } from "react";
import { reduxForm, Field, change } from "redux-form";
import validate from "./validate";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Editor from "../../../components/Editor";
import { get } from "lodash";
import AceEditor from "react-ace";
import { formValueSelector, formValues } from "redux-form";
import { runTest } from "../../../api/coding.api";
import { handleError } from "../../../libs/handle-error";

const renderEditor = (field) => {
  const onEditorStateChange = (newValue) => {
    field.input.onChange(newValue);
  };
  return <Editor value={field.input.value} onChange={onEditorStateChange} />;
};

const WizardFormThirdPage = (props) => {
  const { handleSubmit, previousPage } = props;
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState("");
  const fileReader = useRef(null);

  const _handleRunTest = async () => {
    setLoading(true);

    try {
      const result = await runTest(props.values);

      if (result && result.success) {
        setResults(result.results.data);
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }

    setLoading(false);
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      // console.log(text);
      // alert(text);
      props.dispatch(change("wizard", "testing", text));
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <Row>
      <Col xs={12} lg={8}>
        <Field name="testing" component={renderEditor} />
      </Col>
      <Col xs={12} lg={4}>
        <Row>
          <Col xs={12}>
            <div className="form-group row">
              <label
                htmlFor="txtFirstNameShipping"
                className="col-lg-3 col-form-label"
              >
                Testing
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

          <Col xs={12}>
            <button
              onClick={_handleRunTest}
              type="submit"
              className="btn btn-info"
              disabled={loading}
            >
              Run Test
            </button>
          </Col>
        </Row>
        <br />

        {results ? (
          <Row>
            <Col xs={12}>
              <span>Time: {get(results, "stats.duration", 0)} ms</span> &nbsp;
              <span>Passed: {get(results, "stats.passes", 0)}</span> &nbsp;
              <span>Failed: {get(results, "stats.failures", 0)}</span>
              <div>
                {get(results, "stats.passPercent", 0) === 100 ? (
                  <p>Congratulations! All tests passed!</p>
                ) : (
                  <div className="output-editor">
                    {get(results, "results.0.suites.0.tests", [])
                      .map((test) => {
                        if (test.fail) {
                          return test.err.message;
                        }
                        return null;
                      })
                      .filter((test) => test)
                      .join("\n")}
                    <AceEditor
                      value={get(results, "results.0.suites.0.tests", [])
                        .map((test) => {
                          if (test.fail) {
                            return test.err.message;
                          }
                          return null;
                        })
                        .filter((test) => test)
                        .join("\n")}
                      showGutter={false}
                      readOnly={true}
                      maxLines={10}
                      showLineNumbers={false}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        ) : null}
      </Col>
    </Row>
  );
};

const form = reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
});

const mapStateToProps = (state) => {
  const selector = formValueSelector("wizard");
  return {
    values: selector(state, "coding", "testing", "language"),
  };
};

export default form(connect(mapStateToProps, {})(WizardFormThirdPage));
