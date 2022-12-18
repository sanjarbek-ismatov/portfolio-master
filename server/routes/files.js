const express = require("express");
const mongoose = require('mongoose')
const Grid = require("gridfs-stream");

const db = mongoose.connection;
var gfs, gfb;

db.once("open", () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection('uploads')
  gfb = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads",
  });
});
const router = express.Router();
router.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err) return res.status(404).send(err);
    else {
      res.status(200).send(file);
    }
  });
});
router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (err) return res.status(404).send(err);
    else {
      res.status(200).send(files);
    }
  });
});
router.get("/image/:image", async (req, res) => {
  
 await  gfs.files.findOne({ filename: req.params.image }, (err, file) => {
    res.contentType(file.contentType);
    if (err) return res.status(404).send('Fayl topilmadi!')
    if (file.contentType === "image/png" || file.contentType === "image/jpeg") {
      const readStream = gfb.openDownloadStream(file._id) 
      readStream.pipe(res);

    }
    else {
      res.send('Rasm emas!')
    }
  });
});

module.exports = router;
