const mongoose = require("mongoose");
module.exports = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected!");
    })
    .catch((e) => console.log(e));
};
