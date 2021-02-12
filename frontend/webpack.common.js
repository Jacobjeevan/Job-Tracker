const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = process.env.NODE_ENV !== "production";

const dotEnvpath = dev ? "./.env" : "./.env.prod";

const webPackplugins = [
  new webpack.HotModuleReplacementPlugin(),
  new Dotenv({ path: dotEnvpath }),
];

if (!dev) {
  webPackplugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: [
          dev
            ? {
                loader: "style-loader",
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: true,
                  modules: {
                    namedExport: true,
                  },
                },
              },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|ttf)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: webPackplugins,
};
