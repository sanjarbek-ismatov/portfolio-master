const express = require("express");
require("dotenv").config();
require("./start/logger")();
require("./start/db")();

const app = express();
require("./start/routes")(app);
app.listen(process.env.PORT, () => {
  console.log("Server working");
});
