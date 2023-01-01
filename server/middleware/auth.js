const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (!req.header("x-token")) return res.status(401).send("Token kerak!");
  try {
    const id = jwt.verify(req.header("x-token"), process.env.SECRET);
    req.id = id._id;
    next();
  } catch (ex) {
    return res.status(401).send("Ro'yhatdan o'tmagan foydalanuvchi");
  }
};
