import React, { useEffect, useState } from "react";
import MaterialTable from "../../components/MaterialTable";
import makeData from "../../makeData";
import { Card, CardBody, Modal, CardFooter, Table } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { listUser, updateStatus } from "../../api/user.api";
import { CORE } from "../../constants";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import user1 from "../../assets/images/users/avatar-1.jpg";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const ListUsers = () => {
  const { user } = useSelector((state) => state.Login);

  const [data, setData] = React.useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userTarget, setUserTarget] = useState(null);

  const _handleUpdateStatus = async (user) => {
    const result = await updateStatus(user);

    if (result && result.success) {
      const newData = [...data];
      newData.forEach((el) => {
        if (el._id === user._id) {
          el.isActived = result.results.isActived;
        }
      });
      setData(newData);
      toast.success(result.message);
    }
  };

  const toggleModal = () => {
    setModalOpen((modalOpen) => !modalOpen);
  };

  const columns = React.useMemo(
    () => [
      {
        id: "avatar",
        Header: "#",
        accessor: (user) => {
          console.log(user.avatar);
          return user.avatar === null ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.firstname.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={CORE.S3_URL + "/" + user.avatar}
                alt=""
              />
            </div>
          );
        },
      },
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        id: "status",
        Header: "Status",
        accessor: (user) => {
          return (
            <div className="custom-control custom-switch mb-2" dir="ltr">
              <input
                type="checkbox"
                className="custom-control-input"
                id={user._id}
                checked={user.isActived}
                disabled={user.role === "admin"}
              />
              <label
                disabled={user.role === "admin"}
                className="custom-control-label"
                htmlFor={user._id}
                onClick={(e) => {
                  if (user.role === "admin") return;
                  _handleUpdateStatus(user);
                }}
              ></label>
            </div>
          );
        },
      },
      {
        id: "action",
        Header: "Action",
        accessor: (user) => {
          return (
            <>
              <button
                className="btn btn-primary btn-sm waves-effect waves-light"
                onClick={() => {
                  setUserTarget(user);
                  toggleModal();
                }}
              >
                View
              </button>
            </>
          );
        },
      },
    ],
    [data]
  );

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await listUser();

      if (result && result.success) {
        setData(result.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      setUserTarget(null);
    }
  }, [modalOpen]);

  if (!user) return <Redirect to="/login" />;

  if (!["admin", "manager"].includes(user.role))
    return <Redirect to="dashboard" />;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="List User" />
          <Card>
            <CardBody>
              <MaterialTable
                columns={columns}
                data={data}
                setData={setData}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
              />
            </CardBody>
          </Card>

          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            onClose={() => alert("hello")}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">User Info</h5>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              {!userTarget || !userTarget.avatar ? (
                <div className="avatar-sm mx-auto mb-4">
                  <span
                    className={
                      "avatar-title rounded-circle bg-soft-"
                      // userTarget.color +
                      // " text-" +
                      // userTarget.color +
                      // " font-size-16"
                    }
                  >
                    {userTarget && userTarget.lastname.charAt(0)}
                  </span>
                </div>
              ) : (
                <div className="mb-4">
                  <img
                    className="rounded-circle avatar-lg"
                    src={
                      userTarget && userTarget.avatar
                        ? CORE.S3_URL + "/" + userTarget.avatar
                        : user1
                    }
                    alt=""
                  />
                </div>
              )}

              <h5 className="font-size-15">
                <Link to="#" className="text-dark">
                  {userTarget
                    ? userTarget.firstname + " " + userTarget.lastname
                    : ""}
                </Link>
              </h5>
              <p className="text-muted">{userTarget && userTarget.role}</p>

              <div className="table-responsive">
                <Table className="table-nowrap mb-0">
                  <tbody>
                    <tr>
                      <th scope="row">Full Name :</th>
                      <td>
                        {userTarget
                          ? userTarget.firstname + " " + userTarget.lastname
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Mobile :</th>
                      <td>{userTarget ? userTarget.phone : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">E-mail :</th>
                      <td>{userTarget ? userTarget.email : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Location :</th>
                      <td>{userTarget ? userTarget.country : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender :</th>
                      <td>
                        {userTarget
                          ? userTarget.gender
                            ? "Female"
                            : "Male"
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Birthday :</th>
                      <td>
                        {userTarget
                          ? format(new Date(userTarget.birthday), "dd/MM/yyyy")
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListUsers;
