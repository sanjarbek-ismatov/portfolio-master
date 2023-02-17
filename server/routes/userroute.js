const express = require("express");
const passwordgenerator = require("../helpers/passwordgenerator");
const { userUpdateValidator } = require("../helpers/validator");
const auth = require("../middleware/auth");
const { upload } = require("../models/storage");
const User = require("../models/usermodel");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.id)
    .select("-password")
    .populate("portfolios", "title images linktitle");
  res.status(200).send(user);
});

router.get("/all", async (req, res) => {
  return res.status(200).send(await User.find());
});

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    "portfolios",
    "title images linktitle"
  );
  if (!user) {
    return res.status(404).send("Foydalanuvchi topilmadi!");
  }
  res.status(200).send(user);
});

router.put("/me/update", [auth, upload.single("image")], async (req, res) => {
  const { error } = userUpdateValidator(req.body);
  if (error) return res.status(400).send("Yaroqsiz forma!");
  const user = await User.findById(req.id);

  if (req.body.password) {
    const hashedPassword = await passwordgenerator(req.body.password);
    if (hashedPassword) {
      user.password = hashedPassword;
      await user.save();
    } else {
      return res.status(400).send("Parol yaroqsiz!");
    }
  } else {
    await user.update(req.body);
  }

  res.status(200).send("Malumotlar yangilandi!");
});
module.exports = router;
