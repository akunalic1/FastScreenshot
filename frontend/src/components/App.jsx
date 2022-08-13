import React, { useState } from "react";
import { Route, Routes } from "react-router";

import "./../style/app.css";
import LogIn from "./LogIn.jsx";
import TopBar from "./Topbar";
import Workspace from "./Workspace.jsx";

const isLoggedIn = true;
const IS_ELECTRON = true;

const App = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [areDetailsOpened, setAreDetailsOpened] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Workspace
            isLoggedIn={isLoggedIn}
            isSidebarOpened={isSidebarOpened}
            setIsSidebarOpened={setIsSidebarOpened}
            areDetailsOpened={areDetailsOpened}
            setAreDetailsOpened={setAreDetailsOpened}
          />
        }
      ></Route>
      <Route path="login" element={<LogIn />}></Route>
    </Routes>
  );
};

export default App;
