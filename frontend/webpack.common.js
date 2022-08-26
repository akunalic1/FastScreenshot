const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const context = {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
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
      {
        test: /\.(webm|mp4|png|jpeg|jpg)$/,
        use: "file-loader?name=videos/[name].[ext]",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "[name].index.html",
      manifest: "./public/manifest.json",
    }),
  ],
};

module.exports = context;
