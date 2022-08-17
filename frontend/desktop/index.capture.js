import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CaptureWindow from "./components/CaptureWindow.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CaptureWindow></CaptureWindow>
    </BrowserRouter>
  </React.StrictMode>
);
