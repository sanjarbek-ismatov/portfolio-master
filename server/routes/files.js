const express = require("express");
const mongoose = require('mongoose')
const Grid = require("gridfs-stream");
const db = mongoose.connection;
var gfs, gfsb;

db.once("open", () => {
  gfs =  Grid(db.db, mongoose.mongo);
  gfs.collection('uploads')
  gfsb = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads",
  });
});
const router = express.Router();
router.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (err) return res.status(404).send(err);
    else {
      res.status(200).send(file);
    }
  });
});
router.get("/files",  (req, res) => {
    gfs.files.find().toArray((err, files) => {
    if (err) return res.status(404).send(err);
    else {
      res.status(200).send(files);
    }
  });
});
router.get("/image/:image", (req, res) => {
  gfs.files.findOne({ filename: req.params.image }, (err, file) => {
    if (err) return res.status(404).send('Fayl topilmadi!')
    else if (file.contentType === "image/png" || file.contentType === "image/jpeg") {
      console.log(file)
      const readStream = gfsb.openDownloadStream(file._id);
      readStream.pipe(res);
    }
  });
});
module.exports = router;
