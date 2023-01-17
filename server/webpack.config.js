const NodeExternals = require("webpack-node-externals");
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
    resolve: {
      extensions: [".js"],
    },
  // externals: ["express"],
};
