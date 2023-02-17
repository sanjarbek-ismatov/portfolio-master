// import mongoose
const mongoose = require("mongoose");
// create user schema
const userSchema = new mongoose.Schema({
  image: String,
  firstname: String,
  lastname: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isDirect: {
    default: false,
    type: Boolean,
  },
  registeredDate: {
    type: Date,
    default: () => new Date(),
  },
  portfolios: [{ type: mongoose.SchemaTypes.ObjectId, ref: "portfolio" }],
  description: String,
  telegramProfile: String,
  githubProfile: String,
  skills: {
    type: [String],
  },
  password: String,
});
// create user model
const User = mongoose.model("user", userSchema);
module.exports = User;
