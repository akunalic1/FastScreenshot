const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const context = {
  entry: {
    tray: path.resolve(__dirname, "desktop", "index.tray.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist", "tray"),
  },
};

module.exports = merge(common, context);
