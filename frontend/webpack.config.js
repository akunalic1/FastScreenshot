const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); //to access built-in plugins

const context = {
  mode: "development",
  entry: {
    tray: path.resolve(__dirname, "desktop", "index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        loader: "babel-loader",
        test: /\.js$|jsx/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./desktop/tray.html" })],
};

module.exports = context;

