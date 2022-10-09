const helmet = require("helmet");
const compression = require("compression");
const portfolio = require("../routes/portfolio");
const error = require("../middleware/error");
module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use("/api/get", portfolio);
  app.use(error);
};
