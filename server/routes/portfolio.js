const express = require("express");
const auth = require("../middleware/auth");
const { upload } = require("../models/gfs");
const { Portfolio, User } = require("../models/Model");
const { portfolioValidator } = require("../utils/validator");
const nodemailer = require("nodemailer");
const router = express.Router();
router.get("/all", async (req, res) => {
  const portfolios = await Portfolio.find();
  res.status(200).send(portfolios);
});
router.get("/:id", async (req, res) => {
  const query = req.params.id.split("_")[1].replace("+", " ");
  const portfolio = await Portfolio.findOne({ title: query });
  if (!portfolio) {
    return res.status(404).send("Afsus topilmadi!");
  }
  res.status(200).send(portfolio);
});
router.post("/create", upload.array("images"), auth, async (req, res) => {
  const { error } = portfolioValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const images = req.files.map((e, i) => e.filename);
  const newPortfolio = new Portfolio({
    title: req.body.title,
    description: req.body.description,
    images: images,
    url: req.body.url,
    used: req.body.used.split(", "),
  });
  const userInfo = await User.findById(req.id).select("-password");
  userInfo.portfolios.push(newPortfolio._id);
  newPortfolio.author = Object.assign({ _id: req.id }, userInfo);
  await userInfo.save();
  await newPortfolio.save();
  res.status(201).send("Success");
});
router.put("/like/:id", auth, async (req, res) => {
  const portfolio = await Portfolio.findOne({ _id: req.params.id });
  if (portfolio.likes.includes(req.id)) {
    portfolio.likes.splice(portfolio.likes.indexOf(req.id), 1);
    await portfolio.save();
    return res
      .status(200)
      .send({ count: portfolio.likes.length, isLiked: false });
  } else {
    portfolio.likes.push(req.id);
    await portfolio.save();
    res.status(200).send({ count: portfolio.likes.length, isLiked: true });
  }
});
router.put("/comment/:id", [auth, upload.none()], async (req, res) => {
  const user = Object.assign({ id: req.id }, await User.findById(req.id));

  const portfolio = await Portfolio.findById(req.params.id, "-password");
  portfolio.comments.unshift({
    commentAuthor: user,
    body: req.body.body,
  });
  await portfolio.save();
  res.status(200).send(portfolio.comments);
});
router.delete("/comment/delete/:id", auth, async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  portfolio.comments.splice(req.query.index, 1);
  await portfolio.save();
  res.status(200).send(portfolio.comments);
});
module.exports = router;
