import icons from "../constants/icons";
import axios from "../api/axios";
import React, { useState, useEffect } from "react";
const classnames = require("classnames");

const FolderSidebarItem = ({
  folder,
  depth,
  setSelectedFolder,
  selectedFolder,
  getAllFolders,
  openModal,
  setOpenModal,
  setCreateOrEditModal,
  setParentFolder,
}) => {
  const [openMoreOptions, setOpenMoreOptions] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getNumOfItems(folder);
  }, []);

  const deleteFolder = async (event, folderId) => {
    await axios.delete("/folders/" + folderId);
    getAllFolders();
    handleToggleMoreOptions();
  };

  const changeFileDestination = async (fileUrl, destinationFolderId) => {
    folder.category === "photo"
      ? await axios.patch("/images/", {
          destinationFolderId,
          imageUrl: fileUrl,
        })
      : await axios.patch("/videos/", {
          destinationFolderId,
          videoUrl: fileUrl,
        });
  };

  const getNumOfItems = async (folder) => {
    const resp = await axios.get(
      `/${folder.category === "photo" ? "images" : "videos"}/${folder.id}`
    );

    setCount(resp.data.count);
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

  const clearUrl = (fileUrl) => {
    const unusedPart = fileUrl.slice(
      fileUrl.indexOf("."),
      fileUrl.lastIndexOf(".")
    );
    return "/" + fileUrl.replace(unusedPart, "");
  };

  const handleDropFile = (e, destinationFolder) => {
    const urlParts = e.dataTransfer.getData("text").split("/");
    const fileUrl = clearUrl(urlParts[urlParts.length - 1]);
    changeFileDestination(fileUrl, destinationFolder.id);
  };

  return (
    <li
      key={folder.id}
      className={classnames({
        hasSubfolders: !!folder.subfolders,
      })}
    >
      <div
        className={classnames("folder", {
          "selected-folder": selectedFolder?.id === folder?.id,
        })}
        style={{ marginLeft: `${depth * 16}px` }}
      >
        <div
          className="clickable-folder"
          onClick={(e) => setSelectedFolder(folder)}
        >
          <i className="folder-icon">{icons[folder.icon]}</i>
          <span>{folder.name}</span>
          <span className="image-count">{count}</span>
          <input
            autoComplete="off"
            style={{ marginLeft: `${depth * 16}px` }}
            type={folder.category === "photo" ? "image/*" : "video/*"}
            id="fileElem"
            onDrop={(e) => handleDropFile(e, folder)}
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
