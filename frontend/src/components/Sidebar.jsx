import React from "react";

import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../style/sidebar.css";

const classnames = require("classnames");

const Sidebar = ({ isSidebarOpened }) => {
  return (
    <div className="wrapper">
      <div
        className={classnames("sidebar", "is-fullheight", "hero", {
          showSidebar: isSidebarOpened,
          hideSidebar: !isSidebarOpened,
        })}
      >
        <ul>
          <li>
            <span>Home</span>
            <FontAwesomeIcon icon={faBorderAll} />
          </li>
          <li>
            <span>Home</span>
            <FontAwesomeIcon icon={faBorderAll} />
          </li>
          <li>
            <span>Home</span>
            <FontAwesomeIcon icon={faBorderAll} />
          </li>
          <li>
            <span>Home</span>
            <FontAwesomeIcon icon={faBorderAll} />
          </li>
          <li>
            <span>Home</span>
            <FontAwesomeIcon icon={faBorderAll} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
