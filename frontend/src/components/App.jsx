import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Workspace from "./Workspace.jsx";

import "./../style/app.css";

const isLoggedIn = true;

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
    </Routes>
  );
};

export default App;
