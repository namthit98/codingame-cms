import React, { Component } from "react";
import { Row, Col, Alert, Card, CardBody } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../logo.svg";
import user1 from "../../assets/images/users/avatar-1.jpg";
import { CORE } from "../../constants";
import { changePassword } from "../../api/user.api";
import { handleError } from "../../libs/handle-error";
import { toast } from "react-toastify";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  async handleValidSubmit(event, values) {
    this.setState({
      loading: true,
    });

    try {
      const result = await changePassword(values);

      if (result && result.success) {
        toast.success(result.message);
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <div className="container">
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Change Password</h5>
                          {/* <p>Sign in to continue to Fbeta.</p> */}
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img
                          src={
                            this.props.user && this.props.user.avatar
                              ? CORE.S3_URL + "/" + this.props.user.avatar
                              : user1
                          }
                          alt=""
                          className="img-fluid"
                        />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      {this.props.forgetError && this.props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {this.props.forgetError}
                        </Alert>
                      ) : null}
                      {this.props.forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {this.props.forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        <div className="form-group">
                          <AvField
                            name="oldPassword"
                            label="Old Password"
                            value=""
                            type="password"
                            required
                            placeholder="Enter Old Password"
                            errorMessage="Enter old password"
                            validate={{ required: { value: true } }}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="newPassword"
                            label="New Password"
                            value=""
                            type="password"
                            required
                            placeholder="Enter New Password"
                            errorMessage="Enter new password"
                            validate={{ required: { value: true } }}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="newRepassword"
                            label="New Re-Password"
                            value=""
                            type="password"
                            required
                            placeholder="Enter New Re-Password"
                            errorMessage="Enter new password"
                            validate={{
                              required: { value: true },
                              match: {
                                value: "newPassword",
                                errorMessage: "Password is not matched!",
                              },
                            }}
                          />
                        </div>
                        <Row className="form-group">
                          <Col className="text-right">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Change
                            </button>
                          </Col>
                        </Row>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user } = state.Login;
  return { user };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ChangePassword)
);
