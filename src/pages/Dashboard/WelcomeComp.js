import React from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import { CORE } from '../../constants'

// users
import user1 from "../../assets/images/users/avatar-1.jpg";

import profileImg from "../../assets/images/profile-img.png";

const WelcomeComp = ({ ...props }) => {
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-soft-primary">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>Fbeta Dashboard</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img
                src={profileImg}
                alt=""
                className="img-fluid"
              />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={
                    props.user && props.user.avatar
                      ? CORE.S3_URL + "/" + props.user.avatar
                      : user1
                  }
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">
                {props.user
                  ? props.user.firstname + " " + props.user.lastname
                  : ""}
              </h5>
                <p className="text-muted mb-0 text-truncate" style={{textTransform: 'capitalize'}}>{props.user && props.user.role}</p>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">{props.questionCounter}</h5>
                    <p className="text-muted mb-0">Questions</p>
                  </Col>
                  {/* <Col xs="6">
                    <h5 className="font-size-15">$1245</h5>
                    <p className="text-muted mb-0">Revenue</p>
                  </Col> */}
                </Row>
                <div className="mt-4">
                  <Link
                    to="/users/profile"
                    className="btn btn-primary waves-effect waves-light btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default WelcomeComp;
