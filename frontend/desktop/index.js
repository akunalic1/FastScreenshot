import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Buttons from "./Buttons.jsx";

const root = ReactDOM.createRoot(document.getElementById("root2"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Buttons />
    </BrowserRouter>
  </React.StrictMode>
);
