const express = require("express");
const router = express.Router();
const imageUploader = require("../multer/multerImages");
const {
  uploadSingleImage,
  getAllImages,
  changeImageDestination,
  getImageNumberForFolder,
} = require("../controllers/imageController");

router
  .route("/")
  .post(imageUploader.single("image"), uploadSingleImage)
  .patch(changeImageDestination);

router.route("/all").get(getAllImages);

router.route("/:folderId").get(getImageNumberForFolder);

module.exports = router;
