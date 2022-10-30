const express = require("express");
const { User } = require("../models/Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send("Foydalanuvchi topilmadi");
  }
  const checkedPassword = bcrypt.compare(req.body.password, user.password);
  if (!checkedPassword) {
    return res.status(401).send("Xato parol!");
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.setHeader("x-token", token).send("Login bajarildi!");
});
module.exports = router;
