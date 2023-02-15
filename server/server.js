// import express
const express = require("express");
// import dotenv
require("dotenv").config();
// import dbconnecter
require("./helpers/dbconnecter")();
// import logger
require("./helpers/logger")();
// create app
const app = express();
// export app
module.exports.app = app;
// if test mode
if (process.env.NODE_ENV === "test") {
  // disable console.log
  console.log = () => {};
}
// import routes
require("./helpers/routes")(app);
// listen to port
app.listen(process.env.PORT, () => {
  console.log("Server working");
});
