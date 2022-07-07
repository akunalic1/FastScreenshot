import React, { useState } from "react";
import { Route, Routes } from "react-router";

import "./../style/app.css";
import LogIn from "./LogIn.jsx";
import Workspace from "./Workspace.jsx";

const isLoggedIn = true;

const App = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [areDetailsOpened, setAreDetailsOpened] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Workspace
              isSidebarOpened={isSidebarOpened}
              setIsSidebarOpened={setIsSidebarOpened}
              areDetailsOpened={areDetailsOpened}
              setAreDetailsOpened={setAreDetailsOpened}></Workspace>
          ) : (
            <LogIn></LogIn>
          )
        }></Route>
    </Routes>
  );
};

export default App;

