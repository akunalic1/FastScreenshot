import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FolderSidebarItem from "./FolderSidebarItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SidebarFolderList = ({
  openedMenuOption,
  setSelectedFolder,
  openModal,
  setOpenModal,
  createOrEditModal,
  setCreateOrEditModal,
  setParentFolder,
  folders,
  getAllFolders,
  handleOpenModal,
}) => {
  const [defaultPhotoFolders, setDefaultPhotoFolders] = useState([]);
  const [customPhotoFolders, setCustomPhotoFolders] = useState([]);
  const [defaultVideoFolders, setDefaultVideoFolders] = useState([]);
  const [customVideoFolders, setCustomVideoFolders] = useState([]);

  useEffect(() => {
    setDefaultPhotoFolders(
      folders?.filter(
        (folder) => folder.type === "default" && folder.category === "photo"
      ) || []
    );
    setCustomPhotoFolders(
      folders?.filter(
        (folder) => folder.type !== "default" && folder.category === "photo"
      ) || []
    );
    setDefaultVideoFolders(
      folders?.filter(
        (folder) => folder.type === "default" && folder.category === "video"
      ) || []
    );
    setCustomVideoFolders(
      folders?.filter(
        (folder) => folder.type !== "default" && folder.category === "video"
      ) || []
    );
  }, [folders]);

  const renderFolders = (photoFolders, depth) => {
    return photoFolders?.map((folder) => renderOneFolder(folder, depth));
  };

  const renderOneFolder = (folder, depth) => {
    return (
      <div>
        <FolderSidebarItem
          folder={folder}
          depth={depth}
          setSelectedFolder={setSelectedFolder}
          getAllFolders={getAllFolders}
          openModal={openModal}
          setOpenModal={setOpenModal}
          createOrEditModal={createOrEditModal}
          setCreateOrEditModal={setCreateOrEditModal}
          setParentFolder={setParentFolder}
        />
        {!!folder.subfolders && renderFolders(folder.subfolders, depth + 1)}
      </div>
    );
  };

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
      <div className="separator">
        <div className="sidebar-separator"></div>
        <FontAwesomeIcon
          className="sidebar-button"
          icon={faPlus}
          onClick={handleOpenModal}
        ></FontAwesomeIcon>
      </div>
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

export default SidebarFolderList;
