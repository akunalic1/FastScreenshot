import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./../style/sidebar.css";
import SidebarRotateButton from "./SidebarRotateButton";
import FolderSidebarItem from "./FolderSidebarItem";
import Menu from "./Menu";
import SidebarFolderList from "./SidebarFolderList";

const classnames = require("classnames");

const Sidebar = ({
  isSidebarOpened,
  setIsSidebarOpened,
  openedMenuOption,
  setOpenedMenuOption,
  setSelectedFolder,
  openModal,
  setOpenModal,
  createOrEditModal,
  setCreateOrEditModal,
  setParentFolder,
  folders,
  setFolders,
}) => {
  const getAllFolders = async () => {
    const resp = await axios.get("/folders/all");
    setFolders(resp.data);
  };

  useEffect(() => {
    getAllFolders();
  }, []);

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

  const renderFolders = (photoFolders, depth) => {
    return photoFolders?.map((folder) => renderOneFolder(folder, depth));
  };

  const handleOpenModal = () => {
    setParentFolder(null);
    setOpenModal(true);
  };

  const handleRefreshData = (e) => {
    getAllFolders();
  };

  return (
    <div className="wrapper">
      <div className="sidebar-options">
        <Menu
          setIsSidebarOpened={setIsSidebarOpened}
          setOpenedMenuOption={setOpenedMenuOption}
          openedMenuOption={openedMenuOption}
          isSidebarOpened={isSidebarOpened}
        ></Menu>
      </div>
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
            onClick={handleRefreshData}
          ></FontAwesomeIcon>
          <SidebarRotateButton
            isSidebarOpened={isSidebarOpened}
            setIsSidebarOpened={setIsSidebarOpened}
          />
        </div>
        <div className="title">{openedMenuOption}</div>
        <SidebarFolderList
          openedMenuOption={openedMenuOption}
          setSelectedFolder={setSelectedFolder}
          openModal={openModal}
          setOpenModal={setOpenModal}
          createOrEditModal={createOrEditModal}
          setCreateOrEditModal={setCreateOrEditModal}
          setParentFolder={setParentFolder}
          folders={folders}
          setFolders={setFolders}
          getAllFolders={getAllFolders}
          handleOpenModal={handleOpenModal}
        ></SidebarFolderList>
      </div>
    </div>
  );
};

export default Sidebar;
