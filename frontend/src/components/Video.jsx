import React from "react";

const Video = ({ setClickedItem, video }) => {
  return (
    <video
      controls
      autoplay
      draggable
      onClick={(e) => setClickedItem(video)}
      className="video-content"
      key={video.id}
      src={require("../../../backend/public/videos" + video.url)}
    ></video>
  );
};

export default Video;
