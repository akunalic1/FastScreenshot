import React, { useState } from "react";
import TopBar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Workspace from "./Workspace.jsx";
import Information from "./Information.jsx";
import "./../style/app.css";

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openInformation, setOpenInformation] = useState(true);
  return (
    <>
      <TopBar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        openInformation={openInformation}
        setOpenInformation={setOpenInformation}
      ></TopBar>
      <div className="main-wrapper">
        <Sidebar openSidebar={openSidebar}></Sidebar>
        <Workspace></Workspace>
        <Information openInformation={openInformation}></Information>
      </div>
    </>
  );
};

export default App;
