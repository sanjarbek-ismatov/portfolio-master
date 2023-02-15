// import mongoose
const mongoose = require("mongoose");
// create schema for comment
const commentSchema = new mongoose.Schema(
  {
    body: String,
    commentAuthor: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    date: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
  },
  { collection: "comments" }
);
// create model for comment
const Comment = mongoose.model("comments", commentSchema);
// export comment model
module.exports = Comment;
