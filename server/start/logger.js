// this file is for handling the error
// we use winston for handling the error
// we use express-async-errors for handling the error in async function
// we use process.on for handling the error in promise

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
