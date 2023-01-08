// packages
const express = require("express");

const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
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
    optionsSuccessStatus: 200,
    // origin: [
    //   "http://localhost:3000/",
    //   "https://portfolio-master-uz.vercel.app/",
    // ],
  })
);
// middlewares
// body to json
app.use(bodyParser.json());
// body to form data
app.use(bodyParser.urlencoded({ extended: true }));
// logger for request
app.use(morgan("tiny"));
// idk, for gfs
app.use(methodOverride("_method"));
// For fix streaming
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// for deployment
app.use(compression());
// routes booting
require("./start/routes")(app);
// listening PORT
app.listen(process.env.PORT, () => {
  console.log("Server working");
});
