const portfolio = require("../routes/portfolio");
const register = require("../routes/register");
const files = require("../routes/files");
const login = require("../routes/login");
const error = require("../middleware/error");
const user = require("../routes/user");
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
module.exports = (app) => {
  app.use(
    cors({
      exposedHeaders: "x-token",
      optionsSuccessStatus: 200,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("tiny"));
  app.use(methodOverride("_method"));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(compression());
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/", files);
  app.use("/api/portfolio", portfolio);
  app.use("/api/user", user);
  app.use(error);
};
