const bcrypt = require("bcrypt");
const JoiPasswordComplexity = require("joi-password-complexity");
/**
 * Password generator function for creating and updating user
 * @param {string} password
 * @returns {string} returns hashed password
 */
module.exports = async (password) => {
  const { error } = JoiPasswordComplexity({
    min: 8,
    max: 256,
    numeric: 1,
    lowerCase: 1,
  }).validate(password);
  if (error) return;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
