import React from "react";

const Video = ({
  setClickedItem,
  video,
  areDetailsOpened,
  setAreDetailsOpened,
}) => {
  const handleOnVideoClick = (e) => {
    setAreDetailsOpened(!areDetailsOpened);
    setClickedItem(video);
  };
  return (
    <video
      controls
      autoPlay
      draggable
      onClick={handleOnVideoClick}
      className="video-content"
      key={video.id}
      src={require("../../../backend/public/videos" + video.url)}
    ></video>
  );
};

export default Video;
