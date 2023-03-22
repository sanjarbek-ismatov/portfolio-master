// import express
const express = require("express");
// import dotenv
require("dotenv").config();
// import dbconnecter
require("./helpers/dbconnecter")();
// import logger
require("./helpers/logger");
// create app
const app = express();
// if test mode
if (process.env.NODE_ENV === "test") {
  // disable console.log
  console.log = () => {};
}
// import routes
require("./helpers/routes")(app);
// listen to port
const server = app.listen(process.env.PORT || 4000);
module.exports = { app, server };
