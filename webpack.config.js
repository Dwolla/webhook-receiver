const nodeExternals = require("webpack-node-externals");
const path = require("path");
const swls = require("serverless-webpack");

module.exports = {
  devtool: "nosources-source-map",
  entry: swls.lib.entries,
  externals: [nodeExternals()],
  externalsPresets: {
    node: true
  },
  mode: swls.lib.webpack.isLocal ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  output: {
    filename: "[name].js",
    library: {
      type: "commonjs2"
    },
    path: path.join(__dirname, ".webpack")
  },
  optimization: {
    concatenateModules: false
  },
  resolve: {
    extensions: [".js", ".json", ".ts"]
  },
  target: "node"
};
