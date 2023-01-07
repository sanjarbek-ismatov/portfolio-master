const express = require("express");
const auth = require("../middleware/auth");
const { User, Portfolio } = require("../models/Model");
const router = express.Router();
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.id).select("-password");
  const portfolios = await Portfolio.find();
  const userPortfolios = portfolios
    .filter((e) => {
      return e.author.username === user.username;
    })
    .map((e) => {
      return { title: e.title, url: e.url };
    });
  res.status(200).send({ user, portfolios: userPortfolios });
});
router.get("/all", async (req, res) => {
  return res.status(200).send(await User.find());
});
router.get("/:id", async (req, res) => {
  return res.status(200).send(await User.findById(req.params.id));
});
module.exports = router;
