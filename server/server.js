const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
require("./start/db")();

require("./start/logger")();

const app = express();
app.use(
  cors({
    exposedHeaders: "x-token",
  })
);
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
