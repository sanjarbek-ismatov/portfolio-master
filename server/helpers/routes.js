// import all the routes.
const portfolio = require("../routes/portfolio.routes");
const register = require("../routes/register.routes");
const files = require("../routes/files.routes");
const login = require("../routes/login.routes");
// import error middleware.
const error = require("../middleware/error");
const user = require("../routes/user.routes");
const verify = require("../routes/verify.routes");
// import all the middleware.
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
// export the function.
module.exports = (app) => {
  // use cors.
  app.use(
    cors({
      exposedHeaders: "x-token",
      optionsSuccessStatus: 200,
      origin: [
        "http://localhost:3000",
        "https://portfolio-master-uz.vercel.app",
      ],
    })
  );
  // use body parser.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // use morgan.
  app.use(morgan("tiny"));
  // use method override.
  app.use(methodOverride("_method"));
  // use helmet.
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  // use compression.
  app.use(compression());
  // use register route.
  app.use("/api/register", register);
  // use login route.
  app.use("/api/login", login);
  // use files route.
  app.use("/", files);
  // use portfolio route.
  app.use("/api/portfolio", portfolio);
  // use user route.
  app.use("/api/user", user);
  // use verify route.
  app.use("/api/verify-token", verify);
  // use error middleware.
  app.use(error);
};
