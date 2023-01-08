const mongoose = require("mongoose");
const { portfolioValidator } = require("../utils/validator");
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
  },
  email: {
    type: String,
    unique: true,
  },
  isDirect: {
    default: false,
    type: Boolean,
  },
  portfolios: [mongoose.SchemaTypes.ObjectId],
  description: String,
  telegramProfile: String,
  githubProfile: String,
  skills: {
    type: [String],
  },
  password: String,
});
const User = mongoose.model("user", userSchema);

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
const portfolioSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  author: {},
  date: {
    type: Date,
    default: Date.now(),
  },
  url: String,
  used: [String],
  likes: [mongoose.SchemaTypes.ObjectId],
  comments: [
    {
      commentAuthor: mongoose.SchemaTypes.ObjectId,
      body: String,
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});
const Portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports.createUser = createUser;
module.exports.User = User;
module.exports.Portfolio = Portfolio;
