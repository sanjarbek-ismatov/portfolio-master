const express = require("express");
const { createUser } = require("../models/Model");
const { registerValidator } = require("../utils/validator");
const { gfs, upload } = require("../models/gfs");
const router = express.Router();
router.post("/", upload.single("image"), async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  await createUser(req.body, req.file.id);
  res.send(true);
});
module.exports = router;
