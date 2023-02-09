// import express
const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// import gridfs-stream
const Grid = require("gridfs-stream");
// import db
const db = mongoose.connection;
// create gfs and gfb
var gfs, gfb;

// when db open
db.once("open", () => {
  // create gfs
  gfs = Grid(db.db, mongoose.mongo);
  // create collection
  gfs.collection("uploads");
  // create gfb
  gfb = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads",
  });
});
// create router
const router = express.Router();
// get file by filename
router.get("/files/:filename", (req, res) => {
  // find file
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // if error return 404
    if (err) return res.status(404).send("Fayl topilmadi!");
    // if not error return file
    res.status(200).send(file);
  });
});
// get all files
router.get("/files", (req, res) => {
  // find all files
  gfs.files.find().toArray((err, files) => {
    // if error return 404
    if (err) return res.status(404).send("Fayl topilmadi!");
    // if not error return files
    res.status(200).send(files);
  });
});
// get image by filename
router.get("/image/:image", (req, res) => {
  // find file
  gfs.files.findOne({ filename: req.params.image }, (err, file) => {
    // if error return 404
    if (err) return res.status(404).send("Fayl topilmadi!");
    // if file exist and file contentType is image/png or image/jpeg
    if (
      file &&
      (file.contentType === "image/png" || file.contentType === "image/jpeg")
    ) {
      // create readStream
      const readStream = gfb.openDownloadStream(file._id);
      // pipe readStream to response
      readStream.pipe(res.contentType(file.contentType));
    } else {
      // if file not image return message
      res.send("Rasm emas!");
    }
  });
});
// export router
module.exports = router;
