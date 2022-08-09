import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import Details from "./Details.jsx";
import { useNavigate } from "react-router";
import axios from "axios";

const Workspace = ({
  isLoggedIn,
  isSidebarOpened,
  setIsSidebarOpened,
  areDetailsOpened,
}) => {
  const navigate = useNavigate();
  const [openedMenuOption, setOpenedMenuOption] = useState("Folders");
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [allFolderId, setAllFolderId] = useState(null);

  useEffect(() => {
    const getRootFolder = async () => {
      const resp = await axios.get("http://localhost:3001/folders/root");
      setSelectedFolder(resp.data);
      setAllFolderId(resp.data.id);
    };
    getRootFolder();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  });

  return (
    <div className="main-wrapper">
      <Sidebar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        openedMenuOption={openedMenuOption}
        setOpenedMenuOption={setOpenedMenuOption}
        setSelectedFolder={setSelectedFolder}
      />
      <Content
        setClickedItem={setClickedItem}
        openedMenuOption={openedMenuOption}
        setOpenedMenuOption={setOpenedMenuOption}
        selectedFolder={selectedFolder}
        allFolderId={allFolderId}
      />
      <Details areDetailsOpened={areDetailsOpened} item={clickedItem}></Details>
    </div>
  );
};

export default Workspace;
