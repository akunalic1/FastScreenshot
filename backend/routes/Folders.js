const express = require("express");
const router = express.Router();

router.route("/:id").get((req, res) => {
  console.log(req.params);
  res.send({ folder: "folder bre" });
});

router.route("/").get((req, res) => {
  res.send({ message: "henlooo" });
});

module.exports = router;
