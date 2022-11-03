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
  const user = await new User({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    password: body.password,
  });
  if (id) user.image = id;
  await user.save();
}
module.exports.createUser = createUser;
module.exports.User = User;
