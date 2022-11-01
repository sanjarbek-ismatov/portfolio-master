// packages
const express = require("express");

const methodOverride = require("method-override");
const morgan = require("morgan");

const cors = require("cors");
// dotenv booting
require("dotenv").config();
// db connection
require("./start/db")();
// logger booting
require("./start/logger")();

const app = express();
// using cors for showing x-token
app.use(
  cors({
    exposedHeaders: "x-token",
  })
);
// middlewares
// body to json
app.use(express.json());
// body to form data
app.use(express.urlencoded({ extended: false, type: "form-data" }));
// logger for request
app.use(morgan("tiny"));
// idk, for gfs
app.use(methodOverride("_method"));
// idk
// app.use(helmet());
// // for deployment
// app.use(compression());
// routes booting
require("./start/routes")(app);
// listening PORT
app.listen(process.env.PORT, () => {
  console.log("Server working");
});
