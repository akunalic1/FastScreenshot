import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  faWrench,
  faFolder,
  faImage,
  faFilm,
  faInfo,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../style/sidebar.css";
import SidebarRotateButton from "./SidebarRotateButton";
import FolderSidebarItem from "./FolderSidebarItem";

const classnames = require("classnames");

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

const Sidebar = ({
  isSidebarOpened,
  setIsSidebarOpened,
  openedMenuOption,
  setOpenedMenuOption,
  setSelectedFolder,
}) => {
  const [folders, setFolders] = useState([]);

  const getAllFolders = async () => {
    const resp = await axios.get("http://localhost:3001/folders/all");
    setFolders(resp.data);
  };

  useEffect(() => {
    getAllFolders();
  }, []);

  const renderOneFolder = (folder, depth) => {
    console.log(folder.id);
    return (
      <div>
        <FolderSidebarItem
          folder={folder}
          depth={depth}
          setSelectedFolder={setSelectedFolder}
          getAllFolders={getAllFolders}
        />
        {!!folder.subfolders && renderFolders(folder.subfolders, depth + 1)}
      </div>
    );
  };

  const renderFolders = (photoFolders, depth) => {
    return photoFolders?.map((folder) => renderOneFolder(folder, depth));
  };

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
  };

  const renderMenu = () => {
    return (
      <>
        <div className="upper">
          {upperMenuOptions.map((option) => (
            <div className="icon-wrapper">
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
        <div className="lower">
          {lowerMenuOptions.map((option) => (
            <div className="icon-wrapper">
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

  const renderSidebar = () => {
    const defaultPhotoFolders =
      folders?.filter((folder) => folder.type === "default") || [];
    const customPhotoFolders =
      folders?.filter((folder) => folder.type !== "default") || [];
    const defaultVideoFolders = [];
    const customVideoFolders = [];

    return (
      <>
        <ul style={{ listStyle: "none" }}>
          {renderFolders(
            openedMenuOption === "Photos"
              ? defaultPhotoFolders
              : openedMenuOption === "Videos"
              ? defaultVideoFolders
              : [...defaultPhotoFolders, ...defaultVideoFolders],
            0
          )}
        </ul>
        <div className="sidebar-separator"></div>
        <ul className="custom-folder-list" style={{ listStyle: "none" }}>
          {renderFolders(
            openedMenuOption === "Photos"
              ? customPhotoFolders
              : openedMenuOption === "Videos"
              ? customVideoFolders
              : [...customPhotoFolders, ...customVideoFolders],
            0
          )}
        </ul>
      </>
    );
  };

  return (
    <div className="wrapper">
      <div className="sidebar-options">{renderMenu()}</div>
      <div
        className={classnames("sidebar", {
          showSidebar: isSidebarOpened,
          hideSidebar: !isSidebarOpened,
        })}
      >
        <div className="sidebar-top-buttons">
          <FontAwesomeIcon
            className="sidebar-button"
            icon={faRefresh}
          ></FontAwesomeIcon>
          <SidebarRotateButton
            isSidebarOpened={isSidebarOpened}
            setIsSidebarOpened={setIsSidebarOpened}
          />
        </div>
        <div className="title">{openedMenuOption}</div>
        {renderSidebar()}
      </div>
    </div>
  );
};

export default Sidebar;
