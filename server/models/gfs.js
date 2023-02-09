const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

// create storage for file
const storage = new GridFsStorage({
  // connect to mongodb
  url: process.env.MONGO_URL,
  // create file name
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) reject(err);
        const filename = buff.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          // create bucket name
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

// export upload
module.exports.upload = multer({ storage });
