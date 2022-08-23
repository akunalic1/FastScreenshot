const { Videos } = require("../models");

const uploadSingleVideo = async (req, res) => {
  const { file } = req;
  const type =
    file.mimetype === "application/octet-stream"
      ? `video/${file.originalname.split(".")[1]}`
      : file.mimetype;
  const data = {
    ...req.body,
    name: file?.originalname,
    type,
    url: "/" + file.filename,
    size: file.size,
  };
  await Videos.create(data);
  res.json(data);
};

const getAllVideos = async (req, res) => {
  const allVideos = await Videos.findAll();
  res.send(allVideos);
};

const getVideoNumberForFolder = async (req, res) => {
  const count = await Videos.count({
    where: {
      folder: req.params.folderId,
    },
  });
  res.json({ count });
};

const changeVideoDestination = async (req, res) => {
  const video = await Videos.update(
    {
      folder: req.body.destinationFolderId,
    },
    {
      where: {
        url: req.body.videoUrl,
      },
    }
  );
  res.json(video);
};

module.exports = {
  uploadSingleVideo,
  getAllVideos,
  getVideoNumberForFolder,
  changeVideoDestination,
};
