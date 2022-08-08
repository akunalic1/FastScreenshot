const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});
