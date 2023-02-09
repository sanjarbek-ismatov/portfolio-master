const jwt = require("jsonwebtoken");
const { User } = require("../models/Model");

// this middleware check if user is logged in or not
module.exports = async (req, res, next) => {
  // if there is no token in header
  if (!req.header("x-token")) return res.status(401).send("Token kerak!");
  try {
    // if there is token in header
    const id = jwt.verify(req.header("x-token"), process.env.SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(403).send("Mavjud emas foydalanuvchi!");
    }
    req.id = id._id;
    next();
  } catch (ex) {
    return res.status(401).send("Ro'yhatdan o'tmagan foydalanuvchi");
  }
};
