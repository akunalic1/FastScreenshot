const { Folders } = require("../models");
const { findAllSubfolders } = require("../routesHelpers/folderHeplers");
const { Op } = require("sequelize");

const getAllFolders = async (req, res) => {
  let allFolders = await Folders.findAll();
  allFolders = JSON.parse(JSON.stringify(allFolders));
  allFolders = findAllSubfolders(allFolders);
  res.send(allFolders);
};

const getRootFolderId = async (req, res) => {
  let allFolder = await Folders.findOne({
    where: {
      name: "All",
    },
  });
  res.json(allFolder);
};

const deleteFoldereWithAllSubfolders = async (req, res) => {
  const { id } = req.params;
  const aaa = await Folders.destroy({
    where: {
      [Op.or]: [{ id }, { parentFolder: id }],
    },
  });

  res.send({ response: aaa });
};

const createFolder = async (req, res) => {
  const folder = await Folders.create(req.body);
  res.json(folder);
};

module.exports = {
  getAllFolders,
  getRootFolderId,
  deleteFoldereWithAllSubfolders,
  createFolder,
};
