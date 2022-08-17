import React from "react";

const Image = ({
  setClickedItem,
  image,
  setAreDetailsOpened,
  areDetailsOpened,
}) => {
  const handleOnImageClick = (e) => {
    setAreDetailsOpened(!areDetailsOpened);
    setClickedItem(image);
  };
  return (
    <img
      draggable
      onClick={handleOnImageClick}
      className="image-content"
      key={image.id}
      src={require("../../../backend/public/images" + image.url)}
      alt=""
    ></img>
  );
};

export default Image;
