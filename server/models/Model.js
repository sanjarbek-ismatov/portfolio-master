// import mongoose
const mongoose = require("mongoose");
// import validator
const { portfolioValidator } = require("../utils/validator");
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
// create user function
async function createUser(body, imagename) {
  const user = await new User({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    password: body.password,
    description: body.description,
    telegramProfile: body.telegramProfile,
    githubProfile: body.githubProfile,
    skills: body.skills.split(", "),
  });
  if (imagename) user.image = imagename;
  await user.save();
}
// create portfolio schema
const portfolioSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: function () {
      return new Date();
    },
  },
  url: String,
  used: [String],
  likes: [mongoose.SchemaTypes.ObjectId],
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comments",
    },
  ],
});
const Portfolio = mongoose.model("portfolio", portfolioSchema);
const commentSchema = new mongoose.Schema(
  {
    body: String,
    commentAuthor: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    date: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
  },
  { collection: "comments" }
);
const Comment = mongoose.model("comments", commentSchema);
// create portfolio model

// export functions
module.exports.createUser = createUser;
module.exports.User = User;
module.exports.Portfolio = Portfolio;
module.exports.Comment = Comment;
