const NodeExternals = require("webpack-node-externals");
const path = require("path");
module.exports = {
  entry: "./server.js",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".json"],
  },

  externals: [NodeExternals()],
};
