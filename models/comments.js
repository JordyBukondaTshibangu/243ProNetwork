import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  author: String,
  content: String,
  email: String,
  date: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export default mongoose.model("Comment", CommentSchema);
