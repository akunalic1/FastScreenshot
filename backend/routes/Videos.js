const express = require("express");
const router = express.Router();
const videoUploader = require("../multer/multerVideos");
const {
  uploadSingleVideo,
  getAllVideos,
  getVideoNumberForFolder,
  changeVideoDestination,
} = require("../controllers/videoController");

router
  .route("/")
  .post(videoUploader.single("video"), uploadSingleVideo)
  .patch(changeVideoDestination);
router.route("/all").get(getAllVideos);
router.route("/:folderId").get(getVideoNumberForFolder);

module.exports = router;
