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

const defaultFolders = [
  {
    id: 1,
    name: "All",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 123,
    items: [
      {
        id: 1,
        name: "some name hdjshd",
        url: "https://picsum.photos/id/1/200/300",
        folder: 1,
        date: new Date(),
        type: "JPG",
      },
      {
        id: 2,
        name: "some name hdjshd",
        url: "https://picsum.photos/id/1000/200/300",
        folder: 1,
        date: new Date(),
        type: "JPG",
      },
      {
        id: 3,
        name: "some name hdjshd",
        url: "https://picsum.photos/id/167/200/300",
        folder: 1,
        date: new Date(),
        type: "JPG",
      },
    ],
  },
  {
    id: 2,
    name: "Favorite",
    type: "default",
    icon: <FontAwesomeIcon icon={faHeart} />,
    subfolders: null,
    parentFolder: null,
    amount: 17,
  },
  {
    id: 4,
    name: "Photos",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 12,
  },
  {
    id: 8,
    name: "All videos",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 1,
  },
  {
    id: 9,
    name: "Screen recordings",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 1,
  },
];

const photoFolders = [
  {
    id: 1,
    name: "All",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 123,
  },
  {
    id: 2,
    name: "Favorite",
    type: "default",
    icon: <FontAwesomeIcon icon={faHeart} />,
    subfolders: null,
    parentFolder: null,
    amount: 17,
  },
  {
    id: 3,
    name: "My photoFolders",
    type: "custom",
    icon: <FontAwesomeIcon icon={faFolderTree} />,
    subfolders: [
      {
        id: 6,
        name: "Honey",
        type: "default",
        icon: <FontAwesomeIcon icon={faFolder} />,
        subfolders: null,
        parentFolder: 3,
        amount: 323,
      },
      {
        id: 7,
        name: "beee",
        type: "default",
        icon: <FontAwesomeIcon icon={faFolder} />,
        subfolders: null,
        parentFolder: 3,
        amount: 323,
      },
    ],
    amount: 123,
  },
  {
    id: 4,
    name: "Photos",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 12,
  },
];

const videoFolders = [
  {
    id: 8,
    name: "All videos",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 1,
  },
  {
    id: 9,
    name: "Screen recordings",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 1,
  },
  {
    id: 10,
    name: "Trash",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 1878,
  },
];
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
      const resp = axios.get("http://localhost:3001/folders/all");
      setFolders(resp.data);
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
              <i className="folder-icon">{folder.icon}</i>
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
    return photoFolders.map((folder) => renderOneFolder(folder));
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
    const defaultPhotoFolders = photoFolders.filter(
      (folder) => folder.type === "default"
    );
    const customPhotoFolders = photoFolders.filter(
      (folder) => folder.type !== "default"
    );
    const defaultVideoFolders = videoFolders.filter(
      (folder) => folder.type === "default"
    );
    const customVideoFolders = videoFolders.filter(
      (folder) => folder.type !== "default"
    );

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
