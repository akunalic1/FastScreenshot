import React from "react";
import "./../desktop/tray.css";

const Buttons = () => {
  const handleOpenWorkspaceWindow = (e) => {
    window.ELECTRON_API.openWorkspaceWindow();
  };

  return (
    <div className="tray-buttons">
      <button onClick={handleOpenWorkspaceWindow}>Open </button>
      <button>Settings</button>
    </div>
  );
};

export default Buttons;

