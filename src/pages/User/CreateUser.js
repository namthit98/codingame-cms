import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// const FormValidations = () => {
  
// }

class FormValidations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: new Date(),
      selectedFiles: [],
    };

    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
  }

  handleDefault(date) {
    this.setState({ birthday: date });
  }

  handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    );

    this.setState({ selectedFiles: files });
  };

  /**
   * Formats the size
   */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  handleValidSubmit(event, values) {
    console.log(values)
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <Breadcrumbs title="Home" breadcrumbItem="Create User" />

              <Row>
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle>Profile</CardTitle>

                      <AvField
                        name="firstname"
                        label="Fist Name"
                        placeholder="Input First Nname"
                        type="text"
                        errorMessage="Enter First Name"
                        validate={{ required: { value: true } }}
                      />
                      <AvField
                        name="lastname"
                        label="Last Name"
                        placeholder="Input Last Name"
                        type="text"
                        errorMessage="Enter Last Name"
                        validate={{ required: { value: true } }}
                      />
                      <AvField
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        type="number"
                        errorMessage="Enter Phone Number"
                        validate={{
                          required: { value: true },
                          pattern: {
                            value: "^[0-9]+$",
                            errorMessage: "Only Numbers",
                          },
                        }}
                      />
                      <AvField
                        name="country"
                        label="Country"
                        placeholder="Input Country"
                        type="text"
                        errorMessage="Enter Country"
                        validate={{ required: { value: true } }}
                      />

                      <label>Gender</label>
                      <AvRadioGroup inline name="gender" required>
                        <AvRadio label="Male" value={0} />
                        <AvRadio label="Female" value={1} />
                      </AvRadioGroup>

                      <DatePicker
                        className="form-control"
                        selected={this.state.birthday}
                        onChange={this.handleDefault}
                      />
                      <br />
                      <br />

                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          this.handleAcceptedFiles(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <h3>Drop files here or click to upload.</h3>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {this.state.selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle>Account Infomation</CardTitle>

                      <AvField
                        name="email"
                        label="E-Mail"
                        placeholder="Enter Valid Email"
                        type="email"
                        errorMessage="Invalid Email"
                        validate={{
                          required: { value: true },
                          email: { value: true },
                        }}
                      />

                      <AvField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        errorMessage="Enter password"
                        validate={{ required: { value: true } }}
                      />

                      <AvField
                        label="Re-password"
                        name="repassword"
                        type="password"
                        placeholder="Re-type Password"
                        errorMessage="Enter Re-password"
                        validate={{
                          required: { value: true },
                          match: {
                            value: "password",
                            errorMessage: "Password is not matched!",
                          },
                        }}
                      />
                      <AvField type="select" name="role" label="Role">
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="collaborator">Collaborator</option>
                        <option value="user">User</option>
                      </AvField>
                      <FormGroup className="mb-0">
                        <div>
                          <Button
                            type="submit"
                            color="primary"
                            className="mr-1"
                          >
                            Submit
                          </Button>{" "}
                          <Button type="reset" color="secondary">
                            Cancel
                          </Button>
                        </div>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </AvForm>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FormValidations;
