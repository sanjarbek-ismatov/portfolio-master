const Joi = require("joi");
function registerValidator(body) {
  const valid = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  });
  return valid.validate(body);
}

module.exports.registerValidator = registerValidator;
