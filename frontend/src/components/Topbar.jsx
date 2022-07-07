import React from "react";
import "./../style/topbar.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const classnames = require("classnames");

const TopBar = ({
  openSidebar,
  setOpenSidebar,
  openInformation,
  setOpenInformation,
}) => {
  return (
    <div className="topbar">
      <button
        className={classnames("button", "sidebar-button", {
          "rotate-sidebar-button": openSidebar,
        })}
        onClick={(e) => setOpenSidebar(!openSidebar)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <button
        className={classnames("button", "sidebar-button", {
          "rotate-Information-button": openInformation,
        })}
        onClick={(e) => setOpenInformation(!openInformation)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default TopBar;
