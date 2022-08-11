const { Videos } = require("../models");

const uploadSingleVideo = async (req, res) => {
  const data = {
    ...req.body,
    name: req.file?.originalname,
    type: req.file.mimetype,
    url: "/" + req.file.filename,
    size: req.file.size,
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

module.exports = {
  uploadSingleVideo,
  getAllVideos,
  getVideoNumberForFolder,
};
