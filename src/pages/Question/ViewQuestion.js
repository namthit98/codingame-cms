import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import { formValueSelector } from "redux-form";
import { connect } from "react-redux";
// Form Wizard Steps
import WizardFormFirstPageRoot from "./FormWizardSteps/WizardFormFirstPage";
import WizardFormSecondPageRoot from "./FormWizardSteps/WizardFormSecondPage";
import WizardFormThirdPageRoot from "./FormWizardSteps/WizardFormThirdPage";
import WizardFormFourPageRoot from "./FormWizardSteps/WizardFormFourPage";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { handleError } from "../../libs/handle-error";
import {
  createQuestion,
  getQuestion,
  updateQuestionStatus,
} from "../../api/question.api";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { withRouter } from "react-router-dom";
import { isThisSecond } from "date-fns";
import Editor from "../../components/Editor";
import { runTest } from "../../api/coding.api";
import { toast } from "react-toastify";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.nextPageRoot = this.nextPageRoot.bind(this);
    this.previousPageRoot = this.previousPageRoot.bind(this);

    this.state = {
      pageRoot: 1,
      question: null,
      result: null,
      loading: false,
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
      const result = await createQuestion({
        ...this.props.values,
        description: draftToHtml(
          convertToRaw(this.props.values.description.getCurrentContent())
        ),
      });

      if (result && result.success) {
        this.props.history.push("/questions");
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }
  };

  fetchQuestion = async (id) => {
    try {
      const result = await getQuestion(id);

      if (result && result.success) {
        this.setState({
          question: result.results,
        });
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }
  };

  _handleRunTest = async () => {
    this.setState({ loading: true });
    try {
      const result = await runTest({
        coding: this.state.question.coding,
        testing: this.state.question.testing,
        language: this.state.question.language,
      });

      if (result && result.success) {
        this.setState({
          result: result.results.data,
        });
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }

    this.setState({ loading: false });
  };

  _handleUpdateStatus = async (question) => {
    if (!question) return;
    this.setState({ loading: true });

    const result = await updateQuestionStatus(question);

    if (result && result.success) {
      this.setState({
        question: {
          ...this.state.question,
          isAccepted: result.results.isAccepted,
        },
      });

      toast.success(result.message);
    }
    this.setState({ loading: false });
  };

  componentDidMount() {
    const id = this.props.match.params.questionId;
    this.fetchQuestion(id);
  }

  render() {
    const { pageRoot } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Home" breadcrumbItem="Create Question" />

            <Row className="form-wizard">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <CardTitle>Title</CardTitle>

                    <span>
                      {this.state.question ? this.state.question.title : ""}
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="form-wizard">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <CardTitle>Description</CardTitle>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.question
                          ? this.state.question.description
                          : "",
                      }}
                    ></div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="form-wizard">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <CardTitle>Difficult</CardTitle>

                    <span>
                      {this.state.question ? this.state.question.difficult : ""}
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="form-wizard">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <CardTitle>Language</CardTitle>

                    <span>
                      {this.state.question ? this.state.question.language : ""}
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="form-wizard">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <CardTitle>Coding</CardTitle>

                    <Editor
                      value={
                        this.state.question ? this.state.question.coding : ""
                      }
                      readOnly={true}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="form-wizard">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <CardTitle>Testing</CardTitle>

                    <Editor
                      value={
                        this.state.question ? this.state.question.testing : ""
                      }
                      readOnly={true}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {this.props.user && ["admin", "manager"].includes(this.props.user.role) ? (
              <Row className="form-wizard">
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <button
                            onClick={this._handleRunTest}
                            type="submit"
                            className="btn btn-info"
                            disabled={this.state.loading}
                          >
                            Run Test
                          </button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {this.state.result &&
                          this.state.result.stats.passPercent === 100 ? (
                            <div
                              style={{ margin: 0 }}
                              class="alert alert-success fade show"
                              role="alert"
                            >
                              <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                              <strong>Well done!</strong> Testing is
                              successfuly!
                            </div>
                          ) : null}
                          {this.state.result &&
                          this.state.result.stats.passPercent !== 100 ? (
                            <div
                              style={{ margin: 0 }}
                              class="mb-0 alert alert-danger fade show"
                              role="alert"
                            >
                              <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                              <strong>Failed !!</strong> Testing is failed!
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <button
                            onClick={() =>
                              this._handleUpdateStatus(
                                this.state.question || null
                              )
                            }
                            type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                          >
                            {this.state.question
                              ? this.state.question.isAccepted
                                ? "Reject"
                                : "Accept"
                              : ""}
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.Login;
  return {
    user,
    // values: selector(state, "coding", "testing", "description", "title", "difficult", "language"),
  };
};

export default withRouter(connect(mapStateToProps, {})(CreateQuestion));
