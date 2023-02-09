const mongoose = require("mongoose");

/**
 * @description this function is used to connect to mongodb
 * @returns {Promise<void>}
 */
module.exports = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected!");
    })
    .catch((e) => console.log(e));
};
