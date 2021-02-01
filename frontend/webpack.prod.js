const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [...common.plugins, new HtmlWebpackPlugin()],
  optimization: {
    splitChunks: { chunks: "all" },
  },
});
