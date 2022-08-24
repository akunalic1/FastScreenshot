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
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/captureOptions"),
    },
    port: 5000,
    open: ["captureOptions.index.html"],
  },
};

module.exports = merge(common, context);
