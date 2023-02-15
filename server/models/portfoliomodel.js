// import mongoose
const mongoose = require("mongoose");

// create portfolio schema
const portfolioSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  linktitle: {
    type: String,
    unique: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: function () {
      return new Date();
    },
  },
  url: String,
  used: [String],
  likes: [mongoose.SchemaTypes.ObjectId],
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comments",
    },
  ],
});

// create portfolio model
const Portfolio = mongoose.model("portfolio", portfolioSchema);

// export function
module.exports = Portfolio;
