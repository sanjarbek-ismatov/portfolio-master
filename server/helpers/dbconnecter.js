const mongoose = require("mongoose");

/**
 * @description this function is used to connect to mongodb
 * @returns {Promise<void>}
 */

module.exports = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);
  await mongoose.connect(process.env.MONGO_URL);
};
