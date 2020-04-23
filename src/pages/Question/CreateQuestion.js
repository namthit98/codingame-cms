import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from "reactstrap";

// Form Wizard Steps
import WizardFormFirstPageRoot from "./FormWizardSteps/WizardFormFirstPage";
import WizardFormSecondPageRoot from "./FormWizardSteps/WizardFormSecondPage";
import WizardFormThirdPageRoot from "./FormWizardSteps/WizardFormThirdPage";
import WizardFormFourPageRoot from "./FormWizardSteps/WizardFormFourPage";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class FormWizard extends Component {
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

  render() {
    const { onSubmitRoot } = this.props;
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
                    <CardTitle></CardTitle>

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
                        onSubmit={this.nextPageRoot}
                      />
                    )}
                    {pageRoot === 4 && (
                      <WizardFormFourPageRoot
                        previousPage={this.previousPageRoot}
                        onSubmit={onSubmitRoot}
                      />
                    )}
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
                    {this.state.pageRoot >= 4 ? (
                      <button type="submit" className="btn btn-primary next">
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

export default FormWizard;
