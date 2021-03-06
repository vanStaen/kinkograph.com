const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 9000,
  },
  entry: { index: "./src/index.js", sw: "./src/sw.js" },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:5009"),
      "process.env.API_URL_UPLOAD": JSON.stringify("http://localhost:5009/pictures"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/black-heart-shaped.png" },
        { from: "public/white-heart-128.png" },
        { from: "public/white-heart-512.png" },
        { from: "public/manifest.webmanifest" },
      ],
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader", "image-webpack-loader"],
      },
    ],
  },
};
