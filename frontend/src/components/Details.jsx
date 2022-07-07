import React from "react";

import "./../style/details.css";

const classnames = require("classnames");

const Details = ({ areDetailsOpened }) => {
  console.log(areDetailsOpened);
  return (
    <div className="wrapper">
      <div
        className={classnames("information is-fullheight hero", {
          showInfo: areDetailsOpened,
          hideInfo: !areDetailsOpened,
        })}
      >
        Picture placeholder info
      </div>
    </div>
  );
};

export default Details;
