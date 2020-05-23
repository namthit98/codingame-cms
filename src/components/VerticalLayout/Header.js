import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logo from "../../logo.svg";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

const Header = ({ ...props }) => {
  const [isSearch, setIsSearch] = useState(false);

  /**
   * Toggle sidebar
   */
  const toggleMenu = () => {
    props.toggleMenuCallback();
  };

  /**
   * Toggles the sidebar
   */
  const toggleRightbar = () => {
    props.toggleRightSidebar();
  };

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="17" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="" height="50" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="" height="17" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="" height="50" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>

            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="bx bx-search-alt"></span>
              </div>
            </form> */}
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ml-2">
              {/* <button
                onClick={() => {
                  setIsSearch((isSearch) => !isSearch);
                }}
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify"></i>
              </button> */}

              <div
                className={
                  isSearch
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
           
            </div>

            <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen"></i>
              </button>
            </div>

            {/* <NotificationDropdown /> */}
            <ProfileMenu user={props.user} />

            {/* <div onClick={toggleRightbar} className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="bx bx-cog bx-spin"></i>
              </button>
            </div> */}
          </div>
        
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layoutType } = state.Layout;
  const { user } = state.Login;
  return { layoutType, user };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(Header);
