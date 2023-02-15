const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
/**
 * @description this middleware check if user is logged in or not
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = async (req, res, next) => {
  /**
   * @description if there is no token in header
   */
  if (!req.header("x-token")) return res.status(401).send("Token kerak!");
  try {
    /**
     * @description if there is token in header
     */
    const { _id } = jwt.verify(req.header("x-token"), process.env.SECRET);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(403).send("Mavjud emas foydalanuvchi!");
    }
    req.id = _id;
    next();
  } catch (ex) {
    return res.status(401).send("Ro'yhatdan o'tmagan foydalanuvchi");
  }
};
