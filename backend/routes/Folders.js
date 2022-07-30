const express = require("express");
const router = express.Router();
const { Folders } = require("../models");

router
  .route("/")
  .get((req, res) => {
    res.send({ message: "henlooo" });
  })
  .post(async (req, res) => {
    const data = req.body;
    await Folders.create(data);
    res.json(data);
  });

router.route("/all").get(async (req, res) => {
  const allFolders = await Folders.findAll();
  res.send(allFolders);
});

router.route("/:id").get((req, res) => {
  console.log(req.params);
  res.send({ folder: "folder bre" });
});

module.exports = router;
