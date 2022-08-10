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

module.exports = {
  uploadSingleVideo,
  getAllVideos,
};
