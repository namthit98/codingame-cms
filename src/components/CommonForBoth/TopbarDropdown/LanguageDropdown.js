import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// falgs
import usFlag from "../../../assets/images/flags/us.jpg";
import spain from "../../../assets/images/flags/spain.jpg";
import germany from "../../../assets/images/flags/germany.jpg";
import italy from "../../../assets/images/flags/italy.jpg";
import russia from "../../../assets/images/flags/russia.jpg";

const LanguageDropdown = ({ ...props }) => {
  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu((menu) => !menu);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" tag="button">
          <img src={usFlag} alt="Skote" height="16" />
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
          <DropdownItem tag="a" href="#" className="notify-item">
            <img src={spain} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">Spanish</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#" className="notify-item">
            <img src={germany} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">German</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#" className="notify-item">
            <img src={italy} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">Italian</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#" className="notify-item">
            <img src={russia} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">Russian</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
