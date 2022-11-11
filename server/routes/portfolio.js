const express = require("express");
const auth = require("../middleware/auth");
const { Portfolio } = require("../models/Model");
const router = express.Router();
router.get("/all", async (req, res) => {
  const portfolio = await Portfolio.find();
  res.status(200).send(portfolio);
});
router.post("/create", auth, (req, res) => {});
module.exports = router;
