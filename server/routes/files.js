const express = require("express");
const { gfs, gfsb } = require("../models/gfs");
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
router.get("/image/:image", (req, res) => {
  gfs.files.findOne({ _id: req.params.image }, (err, file) => {
    if (file.contentType === "image/png" || file.contentType === "image/jpeg") {
      const stream = gfsb.openDownloadStream(file._id);
      stream.pipe(res);
    }
  });
});
module.exports = router;
