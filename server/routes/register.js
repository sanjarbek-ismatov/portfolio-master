const express = require("express");
const { createUser } = require("../models/Model");
const { registerValidator } = require("../utils/validator");
const { gfs, upload } = require("../models/gfs");
const bcrypt = require("bcrypt");
const router = express.Router();
router.post("/", upload.single("image"), async (req, res) => {
  const salt = await bcrypt.genSalt();
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const password = await bcrypt.hash(req.body.password, salt);
  req.body.password = password;
  await createUser(req.body, req.file.id);
  res.send(true);
});
module.exports = router;
