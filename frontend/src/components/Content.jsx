import React, { useEffect, useState } from "react";

import "./../style/workspace.css";

const classnames = require("classnames");

const images = [
  {
    id: 1,
    name: "some name hdjshd",
    url: "https://picsum.photos/id/1/200/300",
    folder: 1,
    date: new Date(),
    type: "JPG",
  },
  {
    id: 2,
    name: "some name hdjshd",
    url: "https://picsum.photos/id/1000/200/300",
    folder: 1,
    date: new Date(),
    type: "JPG",
  },
  {
    id: 3,
    name: "some name hdjshd",
    url: "https://picsum.photos/id/167/200/300",
    folder: 1,
    date: new Date(),
    type: "JPG",
  },
];

const Content = ({ selectedFolder, setClickedItem }) => {
  const [items, setItems] = useState(images);

  useEffect(() => {
    setItems(images.filter((image) => image.folder === selectedFolder?.id));
  }, [selectedFolder]);

  const renderOneImage = (image) => {
    return (
      <img
        onClick={(e) => setClickedItem(image)}
        className="image-content"
        key={image.id}
        src={image.url}></img>
    );
  };

  const renderImages = (items) => {
    return items.map((image) => renderOneImage(image));
  };

  return <div className={classnames("content")}>{renderImages(items)}</div>;
};

export default Content;

