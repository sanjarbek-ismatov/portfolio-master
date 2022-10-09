const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect("mongodb://localhost/portfolio")
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((e) => {
      throw e;
    });
};
