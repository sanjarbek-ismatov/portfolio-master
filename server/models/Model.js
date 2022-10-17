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
  const { error } = registerValidator(body);
  if (error) return;
  const user = await new User(body);
  user.image = id;
  await user.save();
}
