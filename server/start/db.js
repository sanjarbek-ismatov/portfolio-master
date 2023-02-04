const mongoose = require("mongoose");
module.exports = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected!");
    })
    .catch((e) => console.log(e));
};
