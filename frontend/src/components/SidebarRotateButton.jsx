import React from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames";

const SidebarRotateButton = ({ isSidebarOpened, setIsSidebarOpened }) => {
  return (
    <button
      className={classNames("sidebar-button", {
        "rotate-sidebar-button": isSidebarOpened,
      })}
      onClick={(e) => setIsSidebarOpened(!isSidebarOpened)}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default SidebarRotateButton;
