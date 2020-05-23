import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Media,
  Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import mini card widgets
// import MiniCards from "./mini-card";

//Import Images
import profile1 from "../../assets/images/profile-img.png";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { getOwn } from "../../api/user.api";
import { CORE } from "../../constants";
import { connect } from "react-redux";
import { listQuestions } from "../../api/question.api";

// import charts
// import ApexRevenue from "./ApexRevenue";

class Profile extends Component {
  state = {
    user: null,
    experiences: [
      {
        id: 1,
        iconClass: "bx-server",
        link: "#",
        designation: "Back end Developer",
        timeDuration: "2016 - 19",
      },
      {
        id: 2,
        iconClass: "bx-code",
        link: "#",
        designation: "Front end Developer",
        timeDuration: "2013 - 16",
      },
      {
        id: 3,
        iconClass: "bx-edit",
        link: "#",
        designation: "UI /UX Designer",
        timeDuration: "2011 - 13",
      },
    ],
    miniCards: [
      {
        title: "Completed Projects",
        iconClass: "bx-check-circle",
        text: "125",
      },
      { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
      { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
    ],
    questions: [],
  };

  _fetchData = async () => {
    const result = await getOwn();
    const questions = await listQuestions();

    if (result && result.success) {
      this.setState({
        user: result.results,
      });
    }

    if (questions && questions.success) {
      this.setState({
        questions: questions.data,
      });
    }
  };

  componentDidMount() {
    this._fetchData();
  }

  render() {
    if (!this.props.user) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Home" breadcrumbItem="Profile" />

            <Row>
              <Col xl="4">
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col xs="7">
                        <div className="text-primary p-3">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>It will seem like simplified</p>
                        </div>
                      </Col>
                      <Col xs="5" className="align-self-end">
                        <img src={profile1} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <Row>
                      <Col sm="4">
                        <div className="avatar-md profile-user-wid mb-4">
                          <img
                            src={
                              this.state.user && this.state.user.avatar
                                ? CORE.S3_URL + "/" + this.state.user.avatar
                                : avatar1
                            }
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                        <h5 className="font-size-15 text-truncate">
                          {this.state.user
                            ? this.state.user.firstname +
                              " " +
                              this.state.user.lastname
                            : ""}
                        </h5>
                        <p
                          className="text-muted mb-0 text-truncate"
                          style={{ textTransform: "capitalize" }}
                        >
                          {this.state.user ? this.state.user.role : ""}
                        </p>
                      </Col>

                      <Col sm={8}>
                        <div className="pt-4">
                          <Row>
                            <Col xs="6">
                              <h5 className="font-size-15">
                                {this.state.questions.length}
                              </h5>
                              <p className="text-muted mb-0">Questions</p>
                            </Col>
                            {/* <Col xs="6">
                              <h5 className="font-size-15">$1245</h5>
                              <p className="text-muted mb-0">Revenue</p>
                            </Col> */}
                          </Row>
                          {/* <div className="mt-4">
                            <Link
                              to=""
                              className="btn btn-primary waves-effect waves-light btn-sm"
                            >
                              View Profile{" "}
                              <i className="mdi mdi-arrow-right ml-1"></i>
                            </Link>
                          </div> */}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Personal Information</CardTitle>

                    {/* <p className="text-muted mb-4">
                      Hi I'm Cynthia Price,has been the industry's standard
                      dummy text To an English person, it will seem like
                      simplified English, as a skeptical Cambridge.
                    </p> */}
                    <div className="table-responsive">
                      <Table className="table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Full Name :</th>
                            <td>
                              {this.state.user
                                ? this.state.user.firstname +
                                  " " +
                                  this.state.user.lastname
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile :</th>
                            <td>
                              {this.state.user ? this.state.user.phone : ""}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">E-mail :</th>
                            <td>
                              {this.state.user ? this.state.user.email : ""}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Location :</th>
                            <td>
                              {this.state.user ? this.state.user.country : ""}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xl="8">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">My Questions</CardTitle>
                    <div className="table-responsive">
                      <Table className="table table-nowrap table-hover mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Title</th>
                            <th scope="col">Language</th>
                            <th scope="col">Difficult</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.questions.map((question) => {
                            return (
                              <tr>
                                <th scope="row">{question.code}</th>
                                <td>{question.title}</td>
                                <td>{question.language}</td>
                                <td>{question.difficult}</td>
                                <td>
                                  {" "}
                                  <span
                                    class={`font-size-12 ${
                                      question.isAccepted
                                        ? "badge-soft-success"
                                        : "badge-soft-danger"
                                    } badge ${
                                      question.isAccepted
                                        ? "badge-success"
                                        : "badge-danger"
                                    } badge-pill`}
                                  >
                                    {question.isAccepted
                                      ? "Accepted"
                                      : "Not Accepted"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
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

export default withRouter(connect(mapStateToProps, {})(Profile));
