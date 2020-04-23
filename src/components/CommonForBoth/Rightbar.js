import React, { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";

import { connect } from "react-redux";
import {
  hideRightSidebar,
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
  changeTopbarTheme,
} from "../../store/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import "./rightbar.scss";
//Import images
import layout1 from "../../assets/images/layouts/layout-1.jpg";
import layout2 from "../../assets/images/layouts/layout-2.jpg";
import layout3 from "../../assets/images/layouts/layout-3.jpg";

const RightSidebar = ({ ...props }) => {
  const [layoutType, setLayoutType] = useState(props.layoutType);
  const [sidebarType, setSidebarType] = useState(props.leftSideBarType);
  const [layoutWidth, setLayoutWidth] = useState(props.layoutWidth);
  const [sidebarTheme, setSidebarTheme] = useState(props.leftSideBarTheme);
  const [topbarTheme, setTopbarTheme] = useState(props.topbarTheme);

  /**
   * Hides the right sidebar
   */
  const hideRightbar = (e) => {
    e.preventDefault();
    props.hideRightSidebar();
  };

  const changeThemePreloader = () => {
    props.changePreloader(!props.isPreloader);
  };
  /**
   * Change the layout
   * @param {*} e
   */
  const changeLayout = (e) => {
    if (e.target.checked) {
      props.changeLayout(e.target.value);
    }
  };

  /**
   * Changes layout width
   * @param {*} e
   */
  const changeLayoutWidth = (e) => {
    if (e.target.checked) {
      props.changeLayoutWidth(e.target.value);
    }
  };

  // change left sidebar design
  const changeLeftSidebarType = (e) => {
    if (e.target.checked) {
      props.changeSidebarType(e.target.value);
    }
  };

  // change left sidebar theme
  const changeLeftSidebarTheme = (e) => {
    if (e.target.checked) {
      props.changeSidebarTheme(e.target.value);
    }
  };

  // change topbar theme
  const changeTopbarTheme = (e) => {
    if (e.target.checked) {
      props.changeTopbarTheme(e.target.value);
    }
  };

  useEffect(() => {
    setLayoutType(props.layoutType);
    setSidebarType(props.leftSideBarType);
    setLayoutWidth(props.layoutWidth);
    setSidebarTheme(props.leftSideBarTheme);
    setTopbarTheme(props.topbarTheme);
  }, [props]);

  return (
    <React.Fragment>
      <div className="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title px-3 py-4">
              <Link
                to="#"
                onClick={hideRightbar}
                className="right-bar-toggle float-right"
              >
                <i className="mdi mdi-close noti-icon"></i>
              </Link>
              <h5 className="m-0">Settings</h5>
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layouts</span>
                <input
                  type="radio"
                  id="radioVertical"
                  name="radioFruit"
                  value="vertical"
                  checked={layoutType === "vertical"}
                  onChange={changeLayout}
                />
                <label htmlFor="radioVertical">Vertical</label>
                {"   "}
                <input
                  type="radio"
                  id="radioHorizontal"
                  name="radioFruit"
                  value="horizontal"
                  checked={layoutType === "horizontal"}
                  onChange={changeLayout}
                />
                <label htmlFor="radioHorizontal">Horizontal</label>
              </div>

              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Layout Width
                </span>
                <input
                  type="radio"
                  id="radioFluid"
                  name="radioWidth"
                  value="fluid"
                  checked={layoutWidth !== "boxed"}
                  onChange={changeLayoutWidth}
                />
                <label htmlFor="radioFluid">Fluid</label>
                {"   "}
                <input
                  type="radio"
                  id="radioBoxed"
                  name="radioWidth"
                  value="boxed"
                  checked={layoutWidth === "boxed"}
                  onChange={changeLayoutWidth}
                />
                <label htmlFor="radioBoxed">Boxed</label>
              </div>
              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Topbar Theme
                </span>
                <input
                  type="radio"
                  id="radioThemeLight"
                  name="radioTheme"
                  value="light"
                  checked={topbarTheme === "light"}
                  onChange={changeTopbarTheme}
                />

                <label htmlFor="radioThemeLight">Light</label>
                {"   "}
                <input
                  type="radio"
                  id="radioThemeDark"
                  name="radioTheme"
                  value="dark"
                  checked={topbarTheme === "dark"}
                  onChange={changeTopbarTheme}
                />
                <label htmlFor="radioThemeDark">Dark</label>
                {"   "}
                {layoutType === "vertical" ? null : (
                  <>
                    {" "}
                    <input
                      type="radio"
                      id="radioThemeColored"
                      name="radioTheme"
                      value="colored"
                      checked={topbarTheme === "colored"}
                      onChange={changeTopbarTheme}
                    />
                    <label htmlFor="radioThemeColored">Colored</label>{" "}
                  </>
                )}
              </div>

              {layoutType === "vertical" ? (
                <React.Fragment>
                  <hr className="mt-1" />
                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Type
                    </span>
                    <input
                      type="radio"
                      id="sidebarDefault"
                      name="sidebarType"
                      value="light"
                      checked={sidebarType === "default"}
                      onChange={changeLeftSidebarType}
                    />

                    <label htmlFor="sidebarDefault">Default</label>
                    {"   "}
                    <input
                      type="radio"
                      id="sidebarCompact"
                      name="sidebarType"
                      value="compact"
                      checked={sidebarType === "compact"}
                      onChange={changeLeftSidebarType}
                    />
                    <label htmlFor="sidebarCompact">Compact</label>
                    {"   "}
                    <input
                      type="radio"
                      id="sidebarIcon"
                      name="sidebarType"
                      value="icon"
                      checked={sidebarType === "icon"}
                      onChange={changeLeftSidebarType}
                    />
                    <label htmlFor="sidebarIcon">Icon</label>
                  </div>

                  <hr className="mt-1" />

                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Type
                    </span>
                    <input
                      type="radio"
                      id="leftsidebarThemelight"
                      name="leftsidebarTheme"
                      value="light"
                      checked={sidebarTheme === "light"}
                      onChange={changeLeftSidebarTheme}
                    />

                    <label htmlFor="leftsidebarThemelight">Light</label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value="dark"
                      checked={sidebarTheme === "dark"}
                      onChange={changeLeftSidebarTheme}
                    />
                    <label htmlFor="leftsidebarThemedark">Dark</label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemecolored"
                      name="leftsidebarTheme"
                      value="colored"
                      checked={sidebarTheme === "colored"}
                      onChange={changeLeftSidebarTheme}
                    />
                    <label htmlFor="leftsidebarThemecolored">Colored</label>
                  </div>
                  <hr className="mt-1" />
                </React.Fragment>
              ) : null}

              <FormGroup>
                <span className="mb-2 d-block" id="radio-title">
                  Preloader
                </span>

                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input checkbox"
                    id="checkbox_1"
                    checked={props.isPreloader}
                    onChange={changeThemePreloader}
                  />
                  <label className="custom-control-label" htmlFor="checkbox_1">
                    Preloader
                  </label>
                </div>
              </FormGroup>

              <h6 className="text-center">Choose Layouts</h6>

              <div className="mb-2">
                <Link
                  to="//skote-v-light.react.themesbrand.com"
                  target="_blank"
                >
                  <img
                    src={layout1}
                    className="img-fluid img-thumbnail"
                    alt=""
                  />
                </Link>
              </div>

              <div className="mb-2">
                <Link to="//skote-v-dark.react.themesbrand.com" target="_blank">
                  <img
                    src={layout2}
                    className="img-fluid img-thumbnail"
                    alt=""
                  />
                </Link>
              </div>

              <div className="mb-2">
                <Link to="//skote-v-rtl.react.themesbrand.com" target="_blank">
                  <img
                    src={layout3}
                    className="img-fluid img-thumbnail"
                    alt=""
                  />
                </Link>
              </div>

              <Link
                to="#"
                className="btn btn-primary btn-block mt-3"
                target="_blank"
              >
                <i className="mdi mdi-cart mr-1"></i> Purchase Now
              </Link>
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default connect(mapStatetoProps, {
  hideRightSidebar,
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
})(RightSidebar);
