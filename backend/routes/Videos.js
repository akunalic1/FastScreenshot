const express = require("express");
const router = express.Router();
const videoUploader = require("../multer/multerVideos");
const {
  uploadSingleVideo,
  getAllVideos,
} = require("../controllers/videoController");

router.route("/").post(videoUploader.single("video"), uploadSingleVideo);
router.route("/all").get(getAllVideos);

module.exports = router;
