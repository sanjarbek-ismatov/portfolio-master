const express = require("express");
const { User } = require("../models/Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginValidator } = require("../utils/validator");
const multer = require("multer");
const router = express.Router();
router.post("/", multer().any(), async (req, res) => {
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send("Foydalanuvchi topilmadi");
  }
  if (req.body.password) {
    const checkedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkedPassword) {
      return res.status(401).send("Xato parol!");
    }
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.setHeader("x-token", token).send("Login bajarildi!");
});
module.exports = router;
