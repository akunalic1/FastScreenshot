const express = require("express");
const router = express.Router();
const { Images } = require("../models");

router
  .route("/")
  .get((req, res) => {
    res.send({ message: "henlooo" });
  })
  .post(async (req, res) => {
    const data = req.body;
    data.date = new Date().toDateString();
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
