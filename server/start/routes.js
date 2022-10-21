const portfolio = require("../routes/portfolio");
const register = require("../routes/register");
const files = require("../routes/files");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use("/api/get", portfolio);
  app.use("/api/register", register);
  app.use("/", files);
  app.use(error);
};
