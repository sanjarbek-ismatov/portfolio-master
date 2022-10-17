const mongoose = require("mongoose");
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const { GridFsStorage } = require("multer-gridfs-storage");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const portfolioSchema = new mongoose.Schema(
  {
    title: String,
  },
  { collection: "portfolio" }
);
const connection = mongoose.createConnection("mongodb://localhost/portfolio");
//   .then(() => {
//     console.log("MongoDB connected!");
//   })
//   .catch((e) => {
//     throw e;
//   });
// let bucket;
// const model = mongoose.model("test", portfolioSchema);
// mongoose.connection.on("connected", () => {
//   bucket = new mongoose.mongo.GridFSBucket(mongoose.connections[0].db, {
//     bucketName: "img",
//   });
// });
let gfs;
connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
});
const storage = new GridFsStorage({
  url: "mongodb://localhost/portfolio",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });
app.post("/test", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).send("ok");
});
app.get("/", (req, res) => {
  res.status(200).send(true);
});
app.listen(4000, () => console.log("ok"));
