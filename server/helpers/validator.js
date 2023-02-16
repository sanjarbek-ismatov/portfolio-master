const Joi = require("joi");
/**
 * @param {object} body
 * @returns {object}
 */
function registerValidator(body) {
  const valid = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string(),
    description: Joi.string(),
    telegramProfile: Joi.string().required(),
    githubProfile: Joi.string(),
    skills: Joi.string(),
  });
  return valid.validate(body);
}
/**
 * @param {object} body
 * @returns {object}
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
 * @returns {object}
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
module.exports = {
  portfolioValidator,
  registerValidator,
  loginValidator,
};
