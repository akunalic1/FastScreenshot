const express = require("express");
const router = express.Router();
const { Folders } = require("../models");
const { findAllSubfolders } = require("../routesHelpers/folderHeplers");

router.route("/").post(async (req, res) => {
  const folder = await Folders.create(req.body);
  res.json(folder);
});

router.route("/all").get(async (req, res) => {
  let allFolders = await Folders.findAll({
    where: {},
  });
  allFolders = JSON.parse(JSON.stringify(allFolders));
  allFolders = findAllSubfolders(allFolders);

  res.send(allFolders);
});

router.route("/:id").get((req, res) => {
  console.log(req.params);
  res.send({ folder: "folder bre" });
});

module.exports = router;
