import icons from "../constants/icons";
import axios from "axios";

import React, { useState } from "react";
const classnames = require("classnames");

const FolderSidebarItem = ({
  folder,
  depth,
  setSelectedFolder,
  getAllFolders,
  openModal,
  setOpenModal,
  createOrEditModal,
  setCreateOrEditModal,
}) => {
  const [openMoreOptions, setOpenMoreOptions] = useState(false);

  const deleteFolder = async (event, folderId) => {
    await axios.delete("http://localhost:3001/folders/" + folderId);
    getAllFolders();
  };

  const createFolder = async (event, folderId) => {
    setOpenModal(!openModal);
    await axios.post("http://localhost:3001/folders/", {
      name: "Default name",
      icon: "fa-folder",
      type: "custom",
      parentFolder: folderId,
    });
    getAllFolders();
  };

  const handleToggleMoreOptions = () => {
    setOpenMoreOptions(!openMoreOptions);
  };
  return (
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
        <div
          className="clickable-folder"
          onClick={(e) => setSelectedFolder(folder)}
        >
          <i className="folder-icon">{icons[folder.icon]}</i>
          <span>{folder.name}</span>
        </div>
        <p>{folder.amount}</p>
        {folder.type !== "default" && (
          <>
            <i
              className={classnames("folder-icon-options")}
              onClick={handleToggleMoreOptions}
            >
              {icons["fa-ellipsis-v"]}
            </i>
            <div
              className={classnames("more-options-folder", {
                hide: !openMoreOptions,
              })}
            >
              <i
                className="add-folder-icon"
                onClick={(e) => deleteFolder(e, folder.id)}
              >
                {icons["fa-trash"]}
              </i>
              <i
                className="add-folder-icon"
                onClick={(e) => createFolder(e, folder.id)}
              >
                {icons["fa-plus"]}
              </i>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default FolderSidebarItem;
