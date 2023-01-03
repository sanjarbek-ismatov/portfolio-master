const express = require("express");
const auth = require("../middleware/auth");
const { User } = require("../models/Model");
const router = express.Router();
router.get("/me", auth, async (req, res) => {
  return res.status(200).send(await User.findById(req.id));
});
router.get("/all", async (req, res) => {
  return res.status(200).send(await User.find());
});
router.get("/:id", async (req, res) => {
  return res.status(200).send(await User.findById(req.params.id));
});
module.exports = router;
