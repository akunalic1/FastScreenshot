import React, { useEffect } from "react";
import "./../style/details.css";
const classnames = require("classnames");

const Details = ({ areDetailsOpened, item, setAreDetailsOpened }) => {
  console.log("clicked item", item);
  console.log("areDetailsOpened", areDetailsOpened);

  useEffect(() => {
    setAreDetailsOpened(true);
  }, [item]);

  return (
    <div className="wrapper">
      <div
        className={classnames("information is-fullheight hero", {
          showInfo: areDetailsOpened,
          hideInfo: !areDetailsOpened,
        })}
      >
        {item && (
          <div className="item-details">
            {item.type.includes("image") ? (
              <img
                className="item-image"
                src={require(`../../../backend/public/images` + item.url)}
              ></img>
            ) : (
              <video
                className="item-image"
                src={require(`../../../backend/public/videos` + item.url)}
              ></video>
            )}
            <h4>{item.name}</h4>
            <span className="item-info-s">
              <p>Created at:</p>
              <p className="data">{new Date(item.createdAt).toUTCString()}</p>
            </span>
            <span className="item-info-s">
              <p>Last updated at:</p>
              <p className="data">{new Date(item.updatedAt).toUTCString()}</p>
            </span>
            <span className="item-info-s">
              <p>Type:</p>
              <p className="data">{item.type.split("/")[1]}</p>
            </span>
            <span className="item-info-s">
              <p>Size:</p>
              <p className="data">{item.size * 0.000001}MB</p>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
