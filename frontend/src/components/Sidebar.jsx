import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  faWrench,
  faFolder,
  faHeart,
  faFolderTree,
  faImage,
  faFilm,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../style/sidebar.css";

const classnames = require("classnames");

const icons = {
  "fa-folder": <FontAwesomeIcon icon={faFolder} />,
  "fa-heart": <FontAwesomeIcon icon={faHeart} />,
  "fa-folder-tree": <FontAwesomeIcon icon={faFolderTree} />,
  "fa-image": <FontAwesomeIcon icon={faImage} />,
  "fa-film": <FontAwesomeIcon icon={faFilm} />,
};

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
  useEffect(() => {
    const getAllFolders = async () => {
      const resp = await axios.get("http://localhost:3001/folders/all");
      setFolders(resp.data);
      console.log("stigli folderiii", resp);
    };
    getAllFolders();
  }, []);

  const renderOneFolder = (folder) => {
    console.log(folder.id);
    return (
      <div>
        <li
          key={folder.id}
          className={classnames({
            hasSubfolders: !!folder.subfolders,
          })}
          onClick={(e) => setSelectedFolder(folder)}
        >
          <div
            className={classnames("folder", {
              isSubfolder: !!folder.parentFolder,
            })}
          >
            <div>
              <i className="folder-icon">{icons[folder.icon]}</i>
              <span>{folder.name}</span>
            </div>
            <p>{folder.amount}</p>
          </div>
        </li>
        {!!folder.subfolders && renderFolders(folder.subfolders)}
      </div>
    );
  };

  const renderFolders = (photoFolders) => {
    return photoFolders?.map((folder) => renderOneFolder(folder));
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
            <FontAwesomeIcon
              values={option.name}
              onClick={(e) => menuIconHandler(e, option)}
              className="menu-icon"
              icon={option.icon}
            />
          ))}
        </div>
        <div className="lower">
          {lowerMenuOptions.map((option) => (
            <FontAwesomeIcon
              values={option.name}
              onClick={(e) => menuIconHandler(e, option)}
              className="menu-icon"
              icon={option.icon}
            />
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
              : [...defaultPhotoFolders, ...defaultVideoFolders]
          )}
        </ul>
        <div className="sidebar-separator"></div>
        <ul style={{ listStyle: "none" }}>
          {renderFolders(
            openedMenuOption === "Photos"
              ? customPhotoFolders
              : openedMenuOption === "Videos"
              ? customVideoFolders
              : [...customPhotoFolders, ...customVideoFolders]
          )}
        </ul>
      </>
    );
  };

  return (
    <div className="wrapper">
      <div className="sidebar-options">{renderMenu()}</div>
      <div
        className={classnames("sidebar", "is-fullheight", "hero", {
          showSidebar: isSidebarOpened,
          hideSidebar: !isSidebarOpened,
        })}
      >
        <div className="title">{openedMenuOption}</div>
        {renderSidebar()}
      </div>
    </div>
  );
};

export default Sidebar;
