const express = require("express");
const { createUser, User } = require("../models/Model");
const { registerValidator } = require("../utils/validator");
const { upload } = require("../models/gfs");
const bcrypt = require("bcrypt");
const {
  sendMail,
  generateToken,
  url,
  verifyToken,
} = require("../utils/mailVerificator");
const router = express.Router();
router.post("/send-verification", async (req, res) => {
  if (!req.body.email) return res.status(400).send("Bad request!");
  const token = generateToken(req.body.email);
  sendMail(
    req.body.email,
    `${url()}/auth/register?email=${req.body.email}&token=${token}`
  );
  res.status(200).send(true);
});

router.post("/", upload.single("image"), async (req, res) => {
  const isVerif = verifyToken(req.headers["token"]);
  if (!isVerif) return res.status(400).send("Ushbu email tasdiqlanmagan!");
  const salt = await bcrypt.genSalt();
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const email = await User.findOne({ email: req.body.email });
  const username = await User.findOne({ username: req.body.username });
  if (email || username) {
    return res.status(400).send("Email yoki username allaqachon mavjud");
  }

  if (req.body.password)
    req.body.password = await bcrypt.hash(req.body.password, salt);
  if (req.file) await createUser(req.body, req.file.filename);
  else await createUser(req.body, null);
  res.send(true);
});
module.exports = router;
