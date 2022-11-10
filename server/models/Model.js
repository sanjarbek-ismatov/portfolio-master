const mongoose = require("mongoose");
const { portfolioValidator } = require("../utils/validator");
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
const portfolioSchema = new mongoose.Schema({
  title: String,
  images: [mongoose.SchemaTypes.ObjectId],
  description: String,
  author: mongoose.SchemaTypes.ObjectId,
  date: {
    type: Date,
    default: Date.now(),
  },
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
  if (error) return;
}
module.exports.createUser = createUser;
module.exports.User = User;
module.exports.Portfolio = Portfolio;
