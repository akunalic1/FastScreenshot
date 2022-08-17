import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CaptureOptions from "./components/CaptureOptions.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CaptureOptions></CaptureOptions>
    </BrowserRouter>
  </React.StrictMode>
);
