import axios from "./src/api/axios";
import dataUrlToBlob from "dataurl-to-blob";

export const saveImage = async (image) => {
  if (image) {
    const blob = dataUrlToBlob(image);
    const file = new File(
      [blob],
      `screenshot.${blob.type.replace("image/", "")}`
    );
    await axios.post(
      "/images",
      {
        image: file,
        name: "screenshot",
        folder: 4,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
};

export const saveVideo = async (video) => {
  const file = new File(
    [video],
    `recording.${video.type.replace("video/", "")}`
  );
  await axios.post(
    "/videos",
    {
      video: file,
      name: "recorder-video",
      folder: 4,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const createStream = async () => {
  return await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      MediaSource: "screen",
      mandatory: {
        chromeMediaSource: "desktop",
      },
    },
  });
};
