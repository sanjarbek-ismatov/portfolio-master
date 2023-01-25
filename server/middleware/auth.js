const jwt = require("jsonwebtoken");
const { User } = require("../models/Model");
module.exports = async (req, res, next) => {
  if (!req.header("x-token")) return res.status(401).send("Token kerak!");
  try {
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
