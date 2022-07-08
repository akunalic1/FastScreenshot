import React, { useEffect, useState } from "react";

import TopBar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import Details from "./Details.jsx";
import { useNavigate } from "react-router";

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
      />
      <Details areDetailsOpened={areDetailsOpened} item={clickedItem}></Details>
    </div>
  );
};

export default Workspace;
