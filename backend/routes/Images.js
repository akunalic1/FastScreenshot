const express = require("express");
const router = express.Router();
const imageUploader = require("../multer/multerImages");
const {
  uploadSingleImage,
  getAllImages,
} = require("../controllers/imageController");

router.route("/").post(imageUploader.single("image"), uploadSingleImage);
router.route("/all").get(getAllImages);

module.exports = router;
