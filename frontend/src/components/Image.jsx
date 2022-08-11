import React from "react";

const Image = ({ setClickedItem, image }) => {
  return (
    <img
      draggable
      onClick={(e) => setClickedItem(image)}
      className="image-content"
      key={image.id}
      src={require("../../../backend/public/images" + image.url)}
    ></img>
  );
};

export default Image;
