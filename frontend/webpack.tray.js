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
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/tray"),
    },
    port: 5001,
    open: ["tray.index.html"],
  },
};

module.exports = merge(common, context);
