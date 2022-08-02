const express = require("express");
const multer = require("multer");
const { Images } = require("../models");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/")
  .get(async (req, res) => {
    const allImages = Images.findAll();
    res.send(allImages);
  })
  .post(upload.single("image"), async (req, res) => {
    const data = {
      ...req.body,
      name: req.file.originalname,
      type: req.file.mimetype,
      base64string: req.file.buffer.toString("base64"),
    };
    await Images.create(data);
    res.json(data);
  });

router.route("/all").get(async (req, res) => {
  const allImages = await Images.findAll();
  res.send(allImages);
});

router.route("/:id").get((req, res) => {
  console.log(req.params);
  res.send({ folder: "folder bre" });
});

module.exports = router;
