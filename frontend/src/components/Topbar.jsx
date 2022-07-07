import React from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../style/topbar.css";

const classnames = require("classnames");

const TopBar = ({
  isSidebarOpened,
  setIsSidebarOpened,
  areDetailsOpened,
  setAreDetailsOpened,
}) => {
  return (
    <div className="topbar">
      <div className="left-topbar">
        <button
          className={classnames("button", "sidebar-button", {
            "rotate-sidebar-button": isSidebarOpened,
          })}
          onClick={(e) => setIsSidebarOpened(!isSidebarOpened)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="logo">loogo</div>
      </div>
      <button
        className={classnames("button", "sidebar-button", {
          "rotate-Information-button": areDetailsOpened,
        })}
        onClick={(e) => setAreDetailsOpened(!areDetailsOpened)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default TopBar;
