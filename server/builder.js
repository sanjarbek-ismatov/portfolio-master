const { builder } = require("buildes");
builder({
  input: "server.js",
  minimized: true,
  bundle: true,
  packages: "external",
  platform: "node",
  output: "dist/bundle.js",
});
