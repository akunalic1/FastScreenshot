import React, { useEffect, useState } from "react";
import axios from "../api/axios";

import Image from "./Image.jsx";
import Video from "./Video.jsx";

import "./../style/workspace.css";

const classnames = require("classnames");

const Content = ({
  selectedFolder,
  setClickedItem,
  allFolderId,
  openedMenuOption,
  areDetailsOpened,
  setAreDetailsOpened,
}) => {
  const [items, setItems] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  const getAllImages = async () => {
    const resp = await axios.get("/images/all");
    setAllImages(resp.data);
  };

  const getAllVideos = async () => {
    const resp = await axios.get("/videos/all");
    setAllVideos(resp.data);
  };

  useEffect(() => {
    getAllImages();
    getAllVideos();
  }, []);

  useEffect(() => {
    if (allFolderId !== selectedFolder?.id) {
      setItems(
        openedMenuOption === "Photos"
          ? allImages.filter((image) => image.folder === selectedFolder?.id)
          : openedMenuOption === "Videos"
          ? allVideos.filter((video) => video.folder === selectedFolder?.id)
          : [
              ...allImages.filter(
                (image) => image.folder === selectedFolder?.id
              ),
              ...allVideos.filter(
                (video) => video.folder === selectedFolder?.id
              ),
            ]
      );
    } else {
      setItems([...allImages, ...allVideos]);
    }
  }, [selectedFolder, openedMenuOption]);

  console.log(items);
  return (
    <div className={classnames("content")}>
      {items.map((item) =>
        item.type.includes("image") ? (
          <Image
            image={item}
            setClickedItem={setClickedItem}
            areDetailsOpened={areDetailsOpened}
            setAreDetailsOpened={setAreDetailsOpened}
          ></Image>
        ) : (
          <Video
            video={item}
            setClickedItem={setClickedItem}
            areDetailsOpened={areDetailsOpened}
            setAreDetailsOpened={setAreDetailsOpened}
          ></Video>
        )
      )}
    </div>
  );
};

export default Content;
