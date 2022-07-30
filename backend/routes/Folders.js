const express = require("express");
const router = express.Router();
const { Folders } = require("../models");

router.route("/:id").get((req, res) => {
  console.log(req.params);
  res.send({ folder: "folder bre" });
});

router
  .route("/")
  .get((req, res) => {
    res.send({ message: "henlooo" });
  })
  .post(async (req, res) => {
    const data = req.body;
    console.log("ono sto je poslano", data);
    await Folders.create(data);
    res.json(data);
  });

module.exports = router;
