const express = require("express");
const cors = require("cors");
const db = require("./../models");
const app = express();

const PORT = process.env.PORT || 3001;

//  Routers
const folderRouter = require("../routes/Folders");

//  Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//  Routes
app.use("/folders", folderRouter);

app.get("/", (req, res) => {
  res.send({ henlo: "henlo" });
});

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
