const express = require("express");
const auth = require("../middleware/auth");
const { User, Portfolio } = require("../models/Model");
const router = express.Router();
//get user data
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.id)
    .select("-password")
    .populate("portfolios", "title images");
  res.status(200).send(user);
});
//get all users
router.get("/all", async (req, res) => {
  return res.status(200).send(await User.find());
});
//get user by id
router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    "portfolios",
    "title images"
  );
  if (!user) {
    return res.status(404).send("Foydalanuvchi topilmadi!");
  }
  res.status(200).send(user);
});
module.exports = router;
