import React from "react";

import TopBar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import Details from "./Details.jsx";

const Workspace = ({
  isSidebarOpened,
  setIsSidebarOpened,
  areDetailsOpened,
  setAreDetailsOpened,
}) => {
  return (
    <>
      <TopBar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        areDetailsOpened={areDetailsOpened}
        setAreDetailsOpened={setAreDetailsOpened}></TopBar>
      <div className="main-wrapper">
        <Sidebar isSidebarOpened={isSidebarOpened}></Sidebar>
        <Content></Content>
        <Details areDetailsOpened={areDetailsOpened}></Details>
      </div>
    </>
  );
};

export default Workspace;
