const { Images } = require("../models");

const uploadSingleImage = async (req, res) => {
  const data = {
    ...req.body,
    name: req.file.originalname,
    type: req.file.mimetype,
    url: "/" + req.file.filename,
    size: req.file.size,
  };
  await Images.create(data);
  res.json(data);
};

const getAllImages = async (req, res) => {
  const allImages = await Images.findAll();
  res.send(allImages);
};

const changeImageDestination = async (req, res) => {
  const image = await Images.update(
    {
      folder: req.body.destinationFolderId,
    },
    {
      where: {
        url: req.body.imageUrl,
      },
    }
  );
  res.json(image);
};
module.exports = {
  uploadSingleImage,
  getAllImages,
  changeImageDestination,
};
