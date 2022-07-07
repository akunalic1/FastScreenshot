import React from "react";
import "./../style/information.css";
const classnames = require("classnames");

const Information = ({ openInformation }) => {
  console.log(openInformation);
  return (
    <div className="wrapper">
      <div
        className={classnames("information is-fullheight hero", {
          showInfo: !openInformation,
          hideInfo: openInformation,
        })}
      >
        Picture placeholder info
      </div>
    </div>
  );
};

export default Information;
