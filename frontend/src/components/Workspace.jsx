import React, { useEffect, useState } from "react";

import TopBar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import Details from "./Details.jsx";
import { useNavigate } from "react-router";

const Workspace = ({ isLoggedIn, isSidebarOpened, areDetailsOpened }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  });

  const [clickedItem, setClickedItem] = useState(null);

  return (
    <div className="main-wrapper">
      <Sidebar isSidebarOpened={isSidebarOpened}></Sidebar>
      <Content setClickedItem={setClickedItem}></Content>
      <Details areDetailsOpened={areDetailsOpened} item={clickedItem}></Details>
    </div>
  );
};

export default Workspace;
