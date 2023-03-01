const Joi = require("joi");
/**
 * @param {object} body
 * @returns {Joi.ValidationResult}
 */
function registerValidator(body) {
  const valid = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    description: Joi.string(),
    telegramProfile: Joi.string(),
    githubProfile: Joi.string(),
    skills: Joi.string(),
  });
  return valid.validate(body);
}
/**
 * @param {object} body
 * @returns {Joi.ValidationResult}
 */
function loginValidator(body) {
  const valid = Joi.object({
    email: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
  });
  return valid.validate(body);
}
/**
 * @param {object} body
 * @returns {Joi.ValidationResult}
 */
function portfolioValidator(body) {
  const valid = Joi.object({
    title: Joi.string().required(),
    images: Joi.array().items(Joi.binary()),
    description: Joi.string(),
    url: Joi.string().required(),
    used: Joi.string(),
  });
  return valid.validate(body);
}
/**
 * This validator checks recieved form from client
 * @param {object} body
 * @returns {Joi.ValidationResult}
 */
function userUpdateValidator(body) {
  const valid = Joi.object({
    image: Joi.allow(Joi.binary(), Joi.string()),
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    description: Joi.string(),
    telegramProfile: Joi.string(),
    githubProfile: Joi.string(),
    skills: Joi.string(),
  });
  return valid.validate(body);
}

module.exports = {
  portfolioValidator,
  registerValidator,
  loginValidator,
  userUpdateValidator,
};
