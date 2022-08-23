import React, { useEffect, useState } from "react";
import "../style/tray.css";
import { saveImage } from "../../utils";

const Buttons = () => {
  const [image, setImage] = useState(null);

  window.ELECTRON_API.receiveScreenshot((event, image) => {
    setImage(image);
  });

  useEffect(() => {
    saveImage(image);
  }, [image]);

  const handleOpenWorkspaceWindow = (e) => {
    window.ELECTRON_API.openWorkspaceWindow();
  };

  const handleOpenCaptureOptions = (e) => {
    window.ELECTRON_API.showCaptureOptions();
  };

  return (
    <div className="tray-buttons">
      <button onClick={handleOpenWorkspaceWindow}>Open Workspace </button>
      <br />
      <button onClick={handleOpenCaptureOptions}>Capture Options</button>
    </div>
  );
};

export default Buttons;
