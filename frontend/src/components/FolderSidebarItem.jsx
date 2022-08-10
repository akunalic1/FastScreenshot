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
  setParentFolder,
}) => {
  const [openMoreOptions, setOpenMoreOptions] = useState(false);

  const deleteFolder = async (event, folderId) => {
    await axios.delete("http://localhost:3001/folders/" + folderId);
    getAllFolders();
    handleToggleMoreOptions();
  };

  const createFolder = async (event, folder) => {
    setOpenModal(!openModal);
    setCreateOrEditModal("create");
    setParentFolder(folder);
    handleToggleMoreOptions();
  };

  const handleToggleMoreOptions = () => {
    setOpenMoreOptions(!openMoreOptions);
  };

  const handleDropFile = (e) => {
    console.log("dropano je ", e);
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
          <input
            autoComplete="off"
            onClick={null}
            style={{ marginLeft: `${depth * 16}px` }}
            type="img"
            id="fileElem"
            onDrop={handleDropFile}
          ></input>
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
                onClick={(e) => createFolder(e, folder)}
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
