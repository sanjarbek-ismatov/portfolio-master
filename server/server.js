// packages
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(helmet());
app.use(compression());
require("./start/routes")(app);
app.listen(process.env.PORT, () => {
  console.log("Server working");
});
