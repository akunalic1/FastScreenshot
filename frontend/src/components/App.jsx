import React, { useState } from "react";
import Workspace from "./Workspace.jsx";

import "./../style/app.css";

const App = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [areDetailsOpened, setAreDetailsOpened] = useState(false);
  return (
    <Workspace
      isSidebarOpened={isSidebarOpened}
      setIsSidebarOpened={setIsSidebarOpened}
      areDetailsOpened={areDetailsOpened}
      setAreDetailsOpened={setAreDetailsOpened}
    />
  );
};

export default App;
