import React, { useEffect } from "react";

import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { } from "../../store/actions";

// MetisMenu
import MetisMenu from "metismenujs";
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

const SidebarContent = (props) => {
  const { user } = useSelector((state) => state.Login);

  return (
    <>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">Menu</li>
          <li>
            <Link to="/dashboard" className="waves-effect">
              <i className="bx bx-home-circle"></i>
              {/* <span className="badge badge-pill badge-info float-right">3</span> */}
              <span>Dashboard</span>
            </Link>
          </li>

          {["admin", "manager"].includes(user ? user.role : "") ? (
            <>
              <li className="menu-title">User</li>
              <li>
                <Link to="/users/create" className="waves-effect">
                  <i className="bx bx-home-circle"></i>
                  <span>Create User</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="waves-effect">
                  <i className="bx bx-home-circle"></i>
                  <span>List Users</span>
                </Link>
              </li>{" "}
            </>
          ) : null}

          <li className="menu-title">Question</li>
          {["collaborator"].includes(user ? user.role : "") ? (
            <>
              {" "}
              <li>
                <Link to="/questions/create" className="waves-effect">
                  <i className="bx bx-home-circle"></i>
                  <span>Create Question</span>
                </Link>
              </li>
              <li>
                <Link to="/questions" className="waves-effect">
                  <i className="bx bx-home-circle"></i>
                  <span>List Questions</span>
                </Link>
              </li>
            </>
          ) : null}

          {["admin", "manager"].includes(user ? user.role : "") ? (
            <>
              <li>
                <Link to="/questions/review" className="waves-effect">
                  <i className="bx bx-home-circle"></i>
                  <span>Review Questions</span>
                </Link>
              </li>
            </>
          ) : null}

          {/* 
          <li className="menu-title">Game</li>
          <li>
            <Link to="/levels" className="waves-effect">
              <i className="bx bx-home-circle"></i>
              <span>Manage Level</span>
            </Link>
          </li>
          <li>
            <Link to="/levels/assign" className="waves-effect">
              <i className="bx bx-home-circle"></i>
              <span>Assign question</span>
            </Link>
          </li> */}
          {/* 
          <li className="menu-title">Other</li>
          <li>
            <Link to="/login" className="waves-effect">
              <i className="bx bx-home-circle"></i>
              <span>Logout</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};

const Sidebar = ({ ...props }) => {
  const location = useLocation();

  const initMenu = () => {
    if (props.type !== "condensed" || props.isMobile) {
      new MetisMenu("#side-menu");

      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    }
  };

  const activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    initMenu();
    // eslint-disable-next-line
  }, [props.type]);

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent />
            </SimpleBar>
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStatetoProps, {})(Sidebar);
