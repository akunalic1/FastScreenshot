const express = require("express");
const cors = require("cors");
const db = require("./../models");
const app = express();

const PORT = process.env.PORT || 3001;

//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//  Routers
const folderRouter = require("../routes/Folders");
const imagesRouter = require("../routes/Images");
const videosRouter = require("../routes/Videos");

//  Routes
app.use("/folders", folderRouter);
app.use("/images", imagesRouter);
app.use("/videos", videosRouter);

app.get("/", (req, res) => {
  res.send({ henlo: "henlo" });
});

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
