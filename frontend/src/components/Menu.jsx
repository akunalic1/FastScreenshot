import React from "react";
import {
  faWrench,
  faFolder,
  faImage,
  faFilm,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const upperMenuOptions = [
  {
    name: "Folders",
    icon: faFolder,
  },
  {
    name: "Photos",
    icon: faImage,
  },
  {
    name: "Videos",
    icon: faFilm,
  },
];

const lowerMenuOptions = [
  {
    name: "Info",
    icon: faInfo,
  },
  {
    name: "Settings",
    icon: faWrench,
  },
];

const Menu = ({
  setIsSidebarOpened,
  setOpenedMenuOption,
  openedMenuOption,
  isSidebarOpened,
}) => {
  const menuIconHandler = (e, option) => {
    if (["Info", "Settings"].includes(option.name)) {
      setIsSidebarOpened(false);
      setOpenedMenuOption(option.name);
    } else {
      if (openedMenuOption === option.name) {
        setIsSidebarOpened(!isSidebarOpened);
      } else {
        setIsSidebarOpened(true);
        setOpenedMenuOption(option.name);
      }
    }
    const allIcons = document.getElementsByClassName("menu-icon");
    Array.from(allIcons).forEach((element) => {
      element.classList.remove("clicked-menu-option");
    });
    e.target.closest(".menu-icon").classList.add("clicked-menu-option");
  };

  return (
    <>
      <div className="upper">
        {upperMenuOptions.map((option) => (
          <div
            key={option.name}
            onClick={(e) => menuIconHandler(e, option)}
            className={"icon-wrapper"}
          >
            <span className="tooltip">{option.name}</span>
            <FontAwesomeIcon
              values={option.name}
              className={classNames("menu-icon", {
                "clicked-menu-option": option.name === "Folders",
              })}
              icon={option.icon}
            />
          </div>
        ))}
      </div>
      <div className="lower">
        {lowerMenuOptions.map((option) => (
          <div key={option.name} className="icon-wrapper">
            <span className="tooltip">{option.name}</span>
            <FontAwesomeIcon
              values={option.name}
              onClick={(e) => menuIconHandler(e, option)}
              className="menu-icon"
              icon={option.icon}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
