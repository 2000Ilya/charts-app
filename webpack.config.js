const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    host: "127.0.0.1",
    port: 9002,
    hot: true,
    devMiddleware: {
      publicPath: "https://localhost:9002/",
    },
  },
  mode: "development",
};
