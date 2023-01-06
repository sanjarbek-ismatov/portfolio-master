const express = require("express");
const auth = require("../middleware/auth");
const { User, Portfolio } = require("../models/Model");
const router = express.Router();
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.id).select("-password");
  const portfolios = await Portfolio.find({
    author: { username: user.username },
  });

  user.portfolios = portfolios;
  return res.status(200).send(user);
});
router.get("/all", async (req, res) => {
  return res.status(200).send(await User.find());
});
router.get("/:id", async (req, res) => {
  return res.status(200).send(await User.findById(req.params.id));
});
module.exports = router;
