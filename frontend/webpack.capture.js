const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const context = {
  entry: {
    capture: path.resolve(__dirname, "desktop", "index.capture.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist", "capture"),
  },
};

module.exports = merge(common, context);
