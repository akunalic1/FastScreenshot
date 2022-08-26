import React from "react";
import { Outlet } from "react-router";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classNames";

import "./../style/topbar.css";

const TopBar = ({
  isSidebarOpened,
  setIsSidebarOpened,
  areDetailsOpened,
  setAreDetailsOpened,
}) => {
  return (
    <>
      <div className="topbar">
        <div className="left-topbar">
          <button
            className={classNames("sidebar-button", {
              "rotate-sidebar-button": isSidebarOpened,
            })}
            onClick={(e) => setIsSidebarOpened(!isSidebarOpened)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="logo"></div>
        </div>
        <button
          className={classNames("sidebar-button", {
            "rotate-Information-button": areDetailsOpened,
          })}
          onClick={(e) => setAreDetailsOpened(!areDetailsOpened)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default TopBar;
