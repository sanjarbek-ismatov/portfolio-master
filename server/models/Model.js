const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: mongoose.SchemaTypes.ObjectId,
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});
const User = mongoose.model("user", userSchema);

async function createUser(body, id) {
  await new User({
    image: id,
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    password: body.password,
  }).save();
}
module.exports.createUser = createUser;
