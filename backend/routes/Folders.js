const express = require("express");
const router = express.Router();
const {
  getAllFolders,
  getRootFolderId,
  deleteFoldereWithAllSubfolders,
} = require("../controllers/folderController");

router.route("/all").get(getAllFolders);
router.route("/root").get(getRootFolderId);
router.route("/:id").delete(deleteFoldereWithAllSubfolders);

module.exports = router;
