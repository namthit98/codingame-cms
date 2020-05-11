import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { CORE } from '../../../constants'

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = ({ ...props }) => {
  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu((menu) => !menu);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={props.user && props.user.avatar ? CORE.S3_URL + '/' + props.user.avatar : user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">{props.user ? props.user.firstname + ' ' + props.user.lastname : ''}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem tag="a" href="#">
            <i className="bx bx-user font-size-16 align-middle mr-1"></i>Profile
          </DropdownItem> */}
          <Link to="/users/profile" className="dropdown-item">
            <i className="bx bx-user font-size-16 align-middle mr-1"></i>
            <span>Profile</span>
          </Link>
          <Link to="/users/change-password" className="dropdown-item">
            <i className="bx bx-lock-open font-size-16 align-middle mr-1"></i>
            <span>Change password</span>
          </Link>
          {/* <DropdownItem tag="a" href="#">
            <i className="bx bx-wallet font-size-16 align-middle mr-1"></i>My
            Wallet
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="#">
            <span className="badge badge-success float-right">11</span>
            <i className="mdi mdi-settings font-size-17 align-middle mr-1"></i>
            Settings
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="#">
            <i className="bx bx-lock-open font-size-16 align-middle mr-1"></i>
            Lock screen
          </DropdownItem> */}
          <div className="dropdown-divider"></div>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
