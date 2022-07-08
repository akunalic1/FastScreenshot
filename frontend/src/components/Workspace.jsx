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
  const [openedContent, setOpenedContent] = useState("folders");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  });

  const [clickedItem, setClickedItem] = useState(null);

  return (
    <div className="main-wrapper">
      <Sidebar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        openedContent={openedContent}
        setOpenedContent={setOpenedContent}
      />
      <Content
        setClickedItem={setClickedItem}
        openedContent={openedContent}
        setOpenedContent={setOpenedContent}
      />
      <Details areDetailsOpened={areDetailsOpened} item={clickedItem}></Details>
    </div>
  );
};

export default Workspace;
