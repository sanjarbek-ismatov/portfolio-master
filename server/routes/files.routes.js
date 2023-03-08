// import express module
const express = require("express");
// import mongoose module
const mongoose = require("mongoose");
// import gridfs-stream module
const Grid = require("gridfs-stream");
// import db from mongoose
const db = mongoose.connection;
// create gfs and gfb variables
var gfs, gfb;
// open db connection
db.once("open", () => {
  // create gfs variable
  gfs = Grid(db.db, mongoose.mongo);
  // create collection with name uploads
  gfs.collection("uploads");
  // create gfb variable
  gfb = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads",
  });
});
// create router variable
const router = express.Router();
// create get method for get file by filename from db
router.get("/files/:filename", (req, res) => {
  // find file by filename
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // if error return 404
    if (err) return res.status(404).send("Fayl topilmadi!");
    // if not error return file
    res.status(200).send(file);
  });
});
// create get method for get all files from db
router.get("/files", (req, res) => {
  // find all files
  gfs.files.find().toArray((err, files) => {
    // if error return 404
    if (err) return res.status(404).send("Fayl topilmadi!");
    // if not error return files
    res.status(200).send(files);
  });
});
// create get method for get image by filename from db
router.get("/image/:image", (req, res) => {
  // find file by filename
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
// export router variable
module.exports = router;
