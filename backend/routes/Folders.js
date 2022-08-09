const express = require("express");
const router = express.Router();
const { Folders } = require("../models");
const { Op } = require("sequelize");
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

router.route("/root").get(async (req, res) => {
  let allFolder = await Folders.findOne({
    where: {
      name: "All",
    },
  });
  res.json(allFolder);
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.params);
    res.send({ folder: "folder bre" });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const aaa = await Folders.destroy({
      where: {
        [Op.or]: [{ id }, { parentFolder: id }],
      },
    });

    res.send({ response: aaa });
  });

module.exports = router;
