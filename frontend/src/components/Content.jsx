import React, { useEffect, useState } from "react";
import axios from "axios";

import "./../style/workspace.css";

const classnames = require("classnames");

const Content = ({ selectedFolder, setClickedItem, allFolderId }) => {
  const [items, setItems] = useState([]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const getAllImages = async () => {
      const resp = await axios.get("http://localhost:3001/images/all");
      setAllImages(resp.data);
    };
    getAllImages();
  }, []);

  useEffect(() => {
    if (allFolderId != selectedFolder?.id) {
      setItems(
        allImages.filter((image) => image.folder === selectedFolder?.id)
      );
    } else {
      setItems(allImages);
    }
  }, [selectedFolder]);

  const renderOneImage = (image) => {
    return (
      <img
        onClick={(e) => setClickedItem(image)}
        className="image-content"
        key={image.id}
        src={require("../../../backend/public/images" + image.url)}
      ></img>
    );
  };

  const renderOneVideo = (video) => {
    return (
      <video
        controls
        autoplay
        onClick={(e) => setClickedItem(video)}
        className="video-content"
        key={video.id}
        src={require("../../../backend/public/videos" + video.url)}
      ></video>
    );
  };

  const renderImages = (items) => {
    return items.map((image) => renderOneImage(image));
  };

  return <div className={classnames("content")}>{renderImages(items)}</div>;
};

export default Content;
