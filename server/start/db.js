const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected!");
    })
    .catch((e) => console.log(e));
};
