import React from "react";

import {
  faBorderAll,
  faFolder,
  faHeart,
  faFolderTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../style/sidebar.css";

const classnames = require("classnames");

const folders = [
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
    name: "My folders",
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
  {
    id: 5,
    name: "Videos",
    type: "default",
    icon: <FontAwesomeIcon icon={faFolder} />,
    subfolders: null,
    parentFolder: null,
    amount: 323,
  },
];

const Sidebar = ({ isSidebarOpened }) => {
  const renderOneFolder = (folder) => {
    console.log(folder.id);
    return (
      <div>
        <li
          key={folder.id}
          className={classnames({
            hasSubfolders: !!folder.subfolders,
          })}
          onClick={(e) => console.log(folder.id)}>
          <div
            className={classnames("folder", {
              isSubfolder: !!folder.parentFolder,
            })}>
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

  const renderFolders = (folders) => {
    return folders.map((folder) => renderOneFolder(folder));
  };

  return (
    <div className="wrapper">
      <div
        className={classnames("sidebar", "is-fullheight", "hero", {
          showSidebar: isSidebarOpened,
          hideSidebar: !isSidebarOpened,
        })}>
        <div className="title">Folders</div>
        <ol>{renderFolders(folders)}</ol>
      </div>
    </div>
  );
};

export default Sidebar;
