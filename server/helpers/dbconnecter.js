const mongoose = require("mongoose");

/**
 * @description this function is used to connect to mongodb
 * @returns {Promise<void>}
 */

module.exports = () => {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);
  mongoose.connect(process.env.MONGO_URL);
  console.log(mongoose.connection.db);
};
