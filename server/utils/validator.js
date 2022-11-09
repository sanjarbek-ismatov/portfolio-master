const Joi = require("joi");
function registerValidator(body) {
  const valid = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string(),
  });
  return valid.validate(body);
}
function loginValidator(body) {
  const valid = Joi.object({
    email: Joi.string().required().min(3),
    password: Joi.string(),
  });
  return valid.validate(body);
}
function portfolioValidator(body) {
  const valid = Joi.object({
    title: Joi.string().required(),
    images: Joi.array().items(Joi.binary()),
    description: Joi.string(),
    url: Joi.string(),
  });
  return valid.validate(body);
}
module.exports.portfolioValidator = portfolioValidator;
module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
