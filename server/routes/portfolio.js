const express = require("express");
const auth = require("../middleware/auth");
const { upload } = require("../models/gfs");
const { Portfolio } = require("../models/Model");
const { portfolioValidator } = require("../utils/validator");
const router = express.Router();
router.get("/all", async (req, res) => {
  const portfolio = await Portfolio.find();
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
  });
  newPortfolio.author = req.id;
  await newPortfolio.save();
  res.status(201).send("Success");
});
module.exports = router;
