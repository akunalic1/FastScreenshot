const express = require("express");
const router = express.Router();
const imageUploader = require("../multer/multerImages");
const {
  uploadSingleImage,
  getAllImages,
  changeImageDestination,
} = require("../controllers/imageController");

router
  .route("/")
  .post(imageUploader.single("image"), uploadSingleImage)
  .patch(changeImageDestination);

router.route("/all").get(getAllImages);

module.exports = router;
