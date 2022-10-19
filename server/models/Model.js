const mongoose = require("mongoose");
const { registerValidator } = require("../utils/validator");
const userSchema = new mongoose.Schema({
  image: mongoose.SchemaTypes.ObjectId,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("user", userSchema);

async function createUser(body, id) {
  const user = new User({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    password: body.password,
    image: id,
  });
  console.log(user);
  await user.save();
}
module.exports.createUser = createUser;
