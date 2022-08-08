import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

import "./../style/workspace.css";

const classnames = require("classnames");

const Content = ({ selectedFolder, setClickedItem }) => {
  const [items, setItems] = useState([]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const getAllImages = async () => {
      const resp = await axios.get("http://localhost:3001/images/all");
      console.log("renda se respons iz axiosa", resp.data);
      setAllImages(resp.data);
    };
    getAllImages();
  }, []);

  useEffect(() => {
    setItems(allImages.filter((image) => image.folder === selectedFolder?.id));
  }, [selectedFolder]);

  const renderOneImage = (image) => {
    console.log("render one  item ", image);
    return (
      <img
        onClick={(e) => setClickedItem(image)}
        className="image-content"
        key={image.id}
        // src={`data:image/png;base64,${image.base64string}`}
        src={require("../../../backend/public/images" + image.url)}
      ></img>
    );
  };

  const renderImages = (items) => {
    return items.map((image) => renderOneImage(image));
  };

  return <div className={classnames("content")}>{renderImages(items)}</div>;
};

export default Content;
