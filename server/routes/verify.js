const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/Model");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const token = req.headers["x-token"];
    const decodedResult = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedResult);
    if (!user) {
      return res.status(200).send(false);
    }
    return res.status(200).send(true);
  } catch (ex) {
    return res.status(200).send(false);
  }
});
module.exports = router;
