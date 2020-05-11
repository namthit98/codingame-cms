import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import DatePicker from "react-datepicker";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { createUser } from "../../api/user.api";
import { toast } from "react-toastify";
import { handleError } from "../../libs/handle-error";
import UploadAvatar from "../../components/UploadAvatar";

const CreateUser = ({ ...props }) => {
  const [birthday, setBirthday] = useState(new Date());
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDefault = (date) => {
    setBirthday(date);
  };

  const _handleChangeFile = (selectedFiles) => {
    setSelectedFiles(selectedFiles);
  };

  const handleValidSubmit = async (event, values) => {
    setLoading(true);

    try {
      const result = await createUser({
        ...values,
        birthday,
        role: values.role || "user",
        avatar: selectedFiles && selectedFiles.length ? selectedFiles[0] : null,
      });

      if (result && result.success) {
        toast.success(result.message);
      }
    } catch (err) {
      handleError(err);
      console.log(err, "error");
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <AvForm onValidSubmit={handleValidSubmit}>
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
                      name="country"
                      className="form-control"
                      selected={birthday}
                      onChange={handleDefault}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    <br />
                    <br />
                    <UploadAvatar onChange={_handleChangeFile} />
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
                    <AvField
                      type="select"
                      name="role"
                      label="Role"
                      // defaultValue="admin"
                    >
                      <option value="user" selected>
                        User
                      </option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="collaborator">Collaborator</option>
                    </AvField>
                    <FormGroup className="mb-0">
                      <div>
                        <Button
                          type="submit"
                          color="primary"
                          className="mr-1"
                          disabled={loading}
                        >
                          Submit
                        </Button>{" "}
                        {/* <Button type="reset" color="secondary" disabled={loading}>
                          Cancel
                        </Button> */}
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
};

export default CreateUser;
