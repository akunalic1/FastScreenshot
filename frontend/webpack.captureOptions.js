const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const context = {
  entry: {
    captureOptions: path.resolve(
      __dirname,
      "desktop",
      "index.captureOptions.js"
    ),
  },
  output: {
    path: path.resolve(__dirname, "dist", "captureOptions"),
  },
};

module.exports = merge(common, context);
