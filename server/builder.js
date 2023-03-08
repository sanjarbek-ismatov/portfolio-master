const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
esbuild.build({
  entryPoints: ["server.js"],
  bundle: true,
  minify: true,
  platform: "node",
  outfile: "dist/bundle.js",
  plugins: [nodeExternalsPlugin()],
});
