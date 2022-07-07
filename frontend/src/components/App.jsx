import React, { useState } from "react";

import TopBar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Workspace from "./Workspace.jsx";
import Details from "./Details.jsx";

import "./../style/app.css";

const App = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [areDetailsOpened, setAreDetailsOpened] = useState(true);

  return (
    <>
      <TopBar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        areDetailsOpened={areDetailsOpened}
        setAreDetailsOpened={setAreDetailsOpened}
      ></TopBar>
      <div className="main-wrapper">
        <Sidebar isSidebarOpened={isSidebarOpened}></Sidebar>
        <Workspace></Workspace>
        <Details areDetailsOpened={areDetailsOpened}></Details>
      </div>
    </>
  );
};

export default App;
