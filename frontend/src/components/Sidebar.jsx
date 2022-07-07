import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./../style/sidebar.css";

const Sidebar = ({ openSidebar }) => {
  return (
    <div className="wrapper">
      <div
        className={`sidebar is-fullheight hero ${
          !openSidebar ? "showSidebar" : "hideSidebar"
        }`}
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
