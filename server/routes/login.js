const express = require("express");
const { User } = require("../models/Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginValidator } = require("../utils/validator");
const multer = require("multer");
const router = express.Router();

// This is the login route
router.post("/", multer().any(), async (req, res) => {
  // Validate the data
  const { error } = loginValidator(req.body);
  // If there is an error, return 400 status code with error message
  if (error) return res.status(400).send(error.details[0].message);
  // Find the user by email
  const user = await User.findOne({ email: req.body.email });
  // If there is no user, return 401 status code with message

  if (!user) {
    return res.status(401).send("Foydalanuvchi topilmadi");
    // If the user is not direct and there is no password, return 401 status code with message
  }
  if (user.isDirect === false && !req.body.password) {
    return res.status(401).send("Parol kerak");
    // If the user is not direct, check the password
  }
  if (user.isDirect === false) {
    // Compare the password with the hashed password
    const checkedPassword = await bcrypt.compare(
      req.body.password,
      user.password
      // If the password is not correct, return 401 status code with message
    );

    if (!checkedPassword) {
      return res.status(401).send("Xato parol!");
      // Create a token
    }
    // Set the token to the header and return 200 status code with message
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res
    .setHeader("x-token", token)
    .json({ message: "Login bajarildi!", code: 200 });
});

module.exports = router;
