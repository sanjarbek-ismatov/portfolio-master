const crypto = require("crypto");
const grid = require("gridfs-stream");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const db = mongoose.connection;
var gfs, gfsb;

db.once("open", () => {
  gfs = grid(db.db, mongoose.mongo);
  gfsb = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads",
  });
});
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) reject(err);
        const filename = buff.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
module.exports.gfs = gfs;
module.exports.gfsb = gfsb;
module.exports.upload = multer({ storage });