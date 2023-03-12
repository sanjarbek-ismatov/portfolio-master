const express = require("express");
const auth = require("../middleware/auth");
const { upload } = require("../models/storage");
const Portfolio = require("../models/portfoliomodel");
const User = require("../models/usermodel");
const Comment = require("../models/commentmodel");
const { portfolioValidator } = require("../helpers/validator");
const generateLink = require("../helpers/generatelink");
const router = express.Router();

// @route   GET /api/portfolio/all
// @desc    Get all portfolios
// @access  Public
router.get("/all", async (req, res) => {
  const portfolios = await Portfolio.find().populate(
    "author",
    "firstname username image isAdmin"
  );
  portfolios.reverse();
  res.status(200).send(portfolios);
});

// @route   GET /api/portfolio/:id
// @desc    Get portfolio by id
// @access  Public
router.get("/:id", async (req, res) => {
  const portfolio = await Portfolio.findOne({ linktitle: req.params.id })
    .populate("author", "firstname username image isAdmin")
    .populate({
      path: "comments",
      populate: {
        path: "commentAuthor",
        select: "image firstname lastname username isAdmin",
      },
    });
  if (!portfolio) {
    return res.status(404).send("Afsus topilmadi!");
  }
  res.status(200).send(portfolio);
});
router.delete("/delete/:id", auth, async (req, res) => {
  if (req.user.isAdmin || req.user.portfolios.includes(req.params.id)) {
    await Portfolio.findByIdAndDelete(req.params.id);
  }
  const user = await User.findById(req.id);
  user.portfolios = user.portfolios.filter(
    (e) => e.toString() !== req.params.id.toString()
  );
  await user.save();
  res.status(204).send("Portfolio o'chirildi");
});
// @route   POST /api/portfolio/create
// @desc    Create new portfolio
// @access  Private
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
  const link = await generateLink(userInfo.username, req.body.title, Portfolio);
  newPortfolio.linktitle = link;
  userInfo.portfolios.push(newPortfolio._id);
  newPortfolio.author = req.id;
  await userInfo.save();
  await newPortfolio.save();
  res.status(201).send("Success");
});

// @route   PUT /api/portfolio/like/:id
// @desc    Like portfolio
// @access  Private
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

// @route   PUT /api/portfolio/comment/:id
// @desc    Comment portfolio
// @access  Private
router.put("/comment/:id", [auth, upload.none()], async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  const comment = new Comment({
    body: req.body.body,
    commentAuthor: req.id,
  });
  portfolio.comments.unshift(comment._id);
  await comment.save();
  await portfolio.save();
  const sendingPortfolio = await portfolio.populate({
    path: "comments",
    populate: {
      path: "commentAuthor",
      select: "image firstname lastname username",
    },
  });
  res.status(200).send(sendingPortfolio.comments);
});

// @route   DELETE /api/portfolio/comment/delete/:id
// @desc    Delete comment
// @access  Private
router.delete("/comment/delete/:id", auth, async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id).populate({
    path: "comments",
    populate: {
      path: "commentAuthor",
      select: "image firstname lastname username",
    },
  });
  portfolio.comments.splice(req.query.index, 1);
  await portfolio.save();
  res.status(200).send(portfolio.comments);
});

module.exports = router;
