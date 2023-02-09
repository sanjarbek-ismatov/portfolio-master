// import node externals
const NodeExternals = require("webpack-node-externals");
// import path
const path = require("path");
// export module
module.exports = {
  // entry point
  entry: "./server.js",
  // target
  target: "node",
  // mode
  mode: "production",
  // output
  output: {
    // path
    path: path.resolve(__dirname, "dist"),
    // filename
    filename: "bundle.js",
    // clean
    clean: true,
  },
  // resolve
  resolve: {
    // extensions
    extensions: [".js", ".json"],
  },
  // externals
  externals: [NodeExternals()],
};
