const express = require("express");
const { gfs } = require("../models/gfs");
const router = express.Router();
router.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (err) return res.status(404).send(err);
    else {
      res.status(200).send(file);
    }
  });
});
router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, file) => {
    if (err) return res.status(404).send(err);
    else {
      res.status(200).send(file);
    }
  });
});
module.exports = router;
