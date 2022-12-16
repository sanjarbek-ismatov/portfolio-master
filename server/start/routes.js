const portfolio = require("../routes/portfolio");
const register = require("../routes/register");
const files = require("../routes/files");
const login = require("../routes/login");
const error = require("../middleware/error");
const user = require('../routes/user')
module.exports = (app) => {
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/", files);
  app.use("/api/portfolio", portfolio);
  app.use('/api/user', user)
  app.use(error);
};
