const User = require("../models/portfoliomodel");
/**
 * @description this function is used to create a new user
 * @param {object} body
 * @param {string} imagename
 */
async function createUser(body, imagename) {
  const user = new User({
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
module.exports = createUser;
