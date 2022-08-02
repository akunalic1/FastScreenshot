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
  faPlus,
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
  "fa-plus": <FontAwesomeIcon icon={faPlus} />,
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

  const getAllFolders = async () => {
    const resp = await axios.get("http://localhost:3001/folders/all");
    setFolders(resp.data);
    console.log("stigli folderiii", resp);
  };

  useEffect(() => {
    getAllFolders();
  }, []);

  const createFolder = async (event, folderId) => {
    const folder = await axios.post("http://localhost:3001/folders/", {
      name: "Default name",
      icon: "fa-folder",
      type: "default",
      parentFolder: folderId,
    });
    getAllFolders();
  };

  const renderOneFolder = (folder, depth) => {
    console.log(folder.id);
    return (
      <div>
        <li
          key={folder.id}
          className={classnames({
            hasSubfolders: !!folder.subfolders,
          })}
        >
          <div
            className={classnames("folder")}
            style={{ marginLeft: `${depth * 16}px` }}
          >
            <div onClick={(e) => setSelectedFolder(folder)}>
              <i className="folder-icon">{icons[folder.icon]}</i>
              <span>{folder.name}</span>
            </div>
            <p>{folder.amount}</p>
            <i
              className="add-folder-icon"
              onClick={(e) => createFolder(e, folder.id)}
            >
              {icons["fa-plus"]}{" "}
            </i>
          </div>
        </li>
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
              : [...defaultPhotoFolders, ...defaultVideoFolders],
            0
          )}
        </ul>
        <div className="sidebar-separator"></div>
        <ul style={{ listStyle: "none" }}>
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
