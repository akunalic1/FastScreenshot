import React, { useState } from "react";

import "./../style/details.css";

const classnames = require("classnames");

const Details = ({ areDetailsOpened, item }) => {
  console.log(item);

  const showDetails = (item) => {
    return (
      <div className="item-details">
        <img className="item-image" src={item.url}></img>
        <h4>{item.name}</h4>
        <p>{item.date.toString()}</p>
        <p>{item.type}</p>
      </div>
    );
  };
  return (
    <div className="wrapper">
      <div
        className={classnames("information is-fullheight hero", {
          showInfo: areDetailsOpened,
          hideInfo: !areDetailsOpened,
        })}>
        {item && showDetails(item)}
      </div>
    </div>
  );
};

export default Details;
