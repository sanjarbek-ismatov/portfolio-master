const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((e) => {
      throw e;
    });
};
