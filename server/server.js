// import express
const express = require("express");
// import dotenv
require("dotenv").config();
// import db
require("./start/db")();
// import logger
require("./start/logger")();
// create express app
const app = express();
// import routes
require("./start/routes")(app);
// listen to port
app.listen(process.env.PORT, () => {
  console.log("Server working");
});
