const express = require("express");
const { Videos } = require("../models");
const router = express.Router();
const videoUploader = require("../multer/multerVideos");

router
  .route("/")
  .get(async (req, res) => {
    const allVideos = Videos.findAll();
    res.send(allVideos);
  })
  .post(videoUploader.single("video"), async (req, res) => {
    console.log(req.file);
    const data = {
      ...req.body,
      name: req.file?.originalname,
      type: req.file.mimetype,
      url: "/" + req.file.filename,
      size: req.file.size,
    };
    await Videos.create(data);
    res.json(data);
  });

router.route("/all").get(async (req, res) => {
  const allVideos = await Videos.findAll();
  res.send(allVideos);
});

router.route("/:id").get((req, res) => {
  res.send({ folder: "slika" });
});

module.exports = router;
