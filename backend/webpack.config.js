const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: [__dirname],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  }
};
