const { Images, Videos } = require("../models");

const uploadSingleImage = async (req, res) => {
  const { file } = req;
  const type =
    file.mimetype === "application/octet-stream"
      ? `image/${file.originalname.split(".")[1]}`
      : file.mimetype;
  const data = {
    ...req.body,
    name: req.file.originalname,
    type,
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

const getImageNumberForFolder = async (req, res) => {
  let count;
  if ("3" === req.params.folderId) {
    count = (await Images.count()) + (await Videos.count());
  } else
    count = await Images.count({
      where: {
        folder: req.params.folderId,
      },
    });
  res.json({ count });
};

module.exports = {
  uploadSingleImage,
  getAllImages,
  changeImageDestination,
  getImageNumberForFolder,
};
