const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/Model");
const router = express.Router();

// this route is for check user is login or not
router.post("/", async (req, res) => {
  try {
    // get token from header
    const token = req.headers["x-token"];
    // decode token
    const decodedResult = jwt.verify(token, process.env.SECRET);
    // find user by id
    const user = await User.findById(decodedResult);
    // if user not found return false
    if (!user) {
      return res.status(200).send(false);
    }
    // if user found return true
    return res.status(200).send(true);
  } catch (ex) {
    // if token is not valid return false
    return res.status(200).send(false);
  }
});
module.exports = router;
