const express = require("express");
const { Images } = require("../models");
const router = express.Router();
const imageUploader = require("../multer/multerImages");

router
  .route("/")
  .get(async (req, res) => {
    const allImages = Images.findAll();
    res.send(allImages);
  })
  .post(imageUploader.single("image"), async (req, res) => {
    console.log(req.file);
    const data = {
      ...req.body,
      name: req.file.originalname,
      type: req.file.mimetype,
      url: "/" + req.file.filename,
      size: req.file.size,
    };
    await Images.create(data);
    res.json(data);
  });

router.route("/all").get(async (req, res) => {
  const allImages = await Images.findAll();
  res.send(allImages);
});

router.route("/:id").get((req, res) => {
  res.send({ folder: "slika" });
});

module.exports = router;
