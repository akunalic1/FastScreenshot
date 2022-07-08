import React from "react";

import "./../style/login.css";

const LogIn = () => {
  return (
    <div className="login">
      <div className="buttons">
        <button className="button login-btn">Log In</button>
        <button className="button signup-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default LogIn;
