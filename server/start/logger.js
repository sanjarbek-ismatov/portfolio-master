require("express-async-errors");
const winston = require("winston");
module.exports = () => {
  winston.add(new winston.transports.Console({ level: "error" }));
  winston.add(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
  winston.exceptions.handle(
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({ level: "error", filename: "error.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
