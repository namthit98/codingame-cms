import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import { formValueSelector, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
// Form Wizard Steps
import WizardFormFirstPageRoot from "./FormWizardSteps/WizardFormFirstPage";
import WizardFormSecondPageRoot from "./FormWizardSteps/WizardFormSecondPage";
import WizardFormThirdPageRoot from "./FormWizardSteps/WizardFormThirdPage";
import WizardFormFourPageRoot from "./FormWizardSteps/WizardFormFourPage";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { handleError } from "../../libs/handle-error";
import { createQuestion } from "../../api/question.api";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.nextPageRoot = this.nextPageRoot.bind(this);
    this.previousPageRoot = this.previousPageRoot.bind(this);

    this.state = {
      pageRoot: 1,
    };
  }

  nextPageRoot() {
    this.setState({ pageRoot: this.state.pageRoot + 1 });
  }

  previousPageRoot() {
    this.setState({ pageRoot: this.state.pageRoot - 1 });
  }

  handleSubmit = async () => {
    try {
      const {
        title,
        difficult,
        language,
        description,
        coding,
        testing,
      } = this.props.values;

      if (!title) {
        return toast.error("Title is required");
      }

      if (!difficult) {
        return toast.error("Difficult is required");
      }

      if (!language) {
        return toast.error("Language is required");
      }

      if (!description) {
        return toast.error("Description is required");
      }

      if (!coding) {
        return toast.error("Coding is required");
      }

      if (!testing) {
        return toast.error("Testing is required");
      }

      const result = await createQuestion({
        ...this.props.values,
        description: draftToHtml(
          convertToRaw(this.props.values.description.getCurrentContent())
        ),
      });

      if (result && result.success) {
        this.props.history.push("/questions");
        this.props.resetForm()
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }
  };

  render() {
    const { pageRoot } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Home" breadcrumbItem="Create Question" />

            <Row className="form-wizard">
              <Col sm="12">
                <Card className="create-question-card">
                  <CardBody>
                    <CardTitle>
                      {pageRoot === 1 && "Information"}
                      {pageRoot === 2 && "Coding"}
                      {pageRoot === 3 && "Testing"}
                    </CardTitle>
                    {pageRoot === 1 && (
                      <WizardFormFirstPageRoot onSubmit={this.nextPageRoot} />
                    )}
                    {pageRoot === 2 && (
                      <WizardFormSecondPageRoot
                        previousPage={this.previousPageRoot}
                        onSubmit={this.nextPageRoot}
                      />
                    )}
                    {pageRoot === 3 && (
                      <WizardFormThirdPageRoot
                        previousPage={this.previousPageRoot}
                        onSubmit={this.handleSubmit}
                      />
                    )}

                    {/* {pageRoot === 4 && (
                      <WizardFormFourPageRoot
                        previousPage={this.previousPageRoot}
                        onSubmit={onSubmitRoot}
                      />
                    )} */}
                  </CardBody>
                  <CardFooter>
                    <button
                      type="button"
                      className="btn btn-primary previous"
                      onClick={this.previousPageRoot}
                      disabled={this.state.pageRoot <= 1 ? true : false}
                    >
                      {" "}
                      Previous{" "}
                    </button>{" "}
                    &nbsp;
                    {this.state.pageRoot >= 3 ? (
                      <button
                        onClick={this.handleSubmit}
                        className="btn btn-primary next"
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    ) : (
                      <button
                        onClick={this.nextPageRoot}
                        type="submit"
                        className="btn btn-primary next"
                      >
                        {" "}
                        Next{" "}
                      </button>
                    )}
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const form = reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})

const mapStateToProps = (state) => {
  const selector = formValueSelector("wizard");
  return {
    values: selector(
      state,
      "coding",
      "testing",
      "description",
      "title",
      "difficult",
      "language"
    ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetForm: () => dispatch(reset("wizard"))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuestion));
