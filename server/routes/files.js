const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
// const axios = require("axios").default;
const db = mongoose.connection;
var gfs, gfb;

db.once("open", () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
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
  await gfs.files.findOne({ filename: req.params.image }, (err, file) => {
    if (err) return res.status(404).send("Fayl topilmadi!");
    if (file.contentType === "image/png" || file.contentType === "image/jpeg") {
      const readStream = gfb.openDownloadStream(file._id);
      readStream.pipe(res.contentType(file.contentType));
    } else {
      res.send("Rasm emas!");
    }
  });
});
// router.get("/img", async (req, res) => {
//   const file = await axios.get(
//     "http://localhost:4000/image/18b0ef8d03e9cd0cf1c2db3385ce334c.jpg"
//   );
//   // res.contentType("application/jpeg");
//   res.contentType("image/jpeg");
//   res.send(file.data);
// });
module.exports = router;
