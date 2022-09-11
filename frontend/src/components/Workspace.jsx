import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";

import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import Details from "./Details.jsx";
import ModalCreateEditFolder from "./ModalCreateEditFolder.jsx";

const Workspace = ({
  isSidebarOpened,
  setIsSidebarOpened,
  areDetailsOpened,
  setAreDetailsOpened,
}) => {
  const [openedMenuOption, setOpenedMenuOption] = useState("Folders");
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [allFolderId, setAllFolderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [createOrEditModal, setCreateOrEditModal] = useState("create");
  const [parentFolder, setParentFolder] = useState(null);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const getRootFolder = async () => {
      const resp = await axios.get("/folders/root");
      setSelectedFolder(resp.data);
      setAllFolderId(resp.data.id);
    };
    getRootFolder();
  }, []);

  return (
    <div className="main-wrapper">
      <Sidebar
        selectedFolder={selectedFolder}
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        openedMenuOption={openedMenuOption}
        setOpenedMenuOption={setOpenedMenuOption}
        setSelectedFolder={setSelectedFolder}
        openModal={openModal}
        setOpenModal={setOpenModal}
        createOrEditModal={createOrEditModal}
        setCreateOrEditModal={setCreateOrEditModal}
        setParentFolder={setParentFolder}
        folders={folders}
        setFolders={setFolders}
      />
      <Content
        setClickedItem={setClickedItem}
        openedMenuOption={openedMenuOption}
        setOpenedMenuOption={setOpenedMenuOption}
        selectedFolder={selectedFolder}
        allFolderId={allFolderId}
        areDetailsOpened={areDetailsOpened}
        setAreDetailsOpened={setAreDetailsOpened}
      />
      <Details
        areDetailsOpened={areDetailsOpened}
        item={clickedItem}
        setAreDetailsOpened={setAreDetailsOpened}
      ></Details>
      {openModal && (
        <ModalCreateEditFolder
          openModal={openModal}
          setOpenModal={setOpenModal}
          createOrEditModal={createOrEditModal}
          setCreateOrEditModal={setCreateOrEditModal}
          parentFolder={parentFolder}
          setFolders={setFolders}
          openedMenuOption={openedMenuOption}
        ></ModalCreateEditFolder>
      )}
    </div>
  );
};

export default Workspace;
