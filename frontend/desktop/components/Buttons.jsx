import React from "react";
import "../style/tray.css";

const Buttons = () => {
  const handleOpenWorkspaceWindow = (e) => {
    window.ELECTRON_API.openWorkspaceWindow();
    window.ELECTRON_API.receiveCapturedImage();
  };

  const handleOpenCaptureOptions = (e) => {
    window.ELECTRON_API.showCaptureOptions();
  };

  const handleSendMessageToCaptureWindow = (e) => {
    window.ELECTRON_API.sendMessage();
  };

  return (
    <div className="tray-buttons">
      <button onClick={handleOpenWorkspaceWindow}>Open Workspace </button>
      <button onClick={handleOpenCaptureOptions}>Capture Options</button>
      <br />
      <button onClick={handleSendMessageToCaptureWindow}>
        Send message to capture window
      </button>
    </div>
  );
};

export default Buttons;
