const mongoose = require("mongoose");
const { portfolioValidator } = require("../utils/validator");
const userSchema = new mongoose.Schema({
  image: mongoose.SchemaTypes.ObjectId,
  firstname: String,
  lastname: String,
  isAdmin: Boolean,
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
  description: String,
  telegramProfile: String,
  githubProfile: String,
  skills: {
    type: [String],
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
const portfolioSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  author: mongoose.SchemaTypes.ObjectId,
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
  url: String,
});
const Portfolio = mongoose.model("portfolio", portfolioSchema);
async function createPortfolio(body) {
  const { error } = portfolioValidator();
  if (error) return false;
  await new Portfolio(body).save();
  return true;
}
module.exports.createUser = createUser;
module.exports.User = User;
module.exports.Portfolio = Portfolio;
