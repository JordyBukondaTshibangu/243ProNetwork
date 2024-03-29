import moment from "moment";
import mongoose from "mongoose";
import Post from "../models/post.js";
import Comment from "../models/comments.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("post");
    if (comments.length > 0) {
      res.status(200).json({
        message: "ALL COMMENTS FETCHED SUCCESSFULLY",
        count: comments.length,
        comments,
      });
    } else {
      res.status(404).json({
        message: "NO COMMENTS FOUND ",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const createComment = async (req, res, next) => {
  const { author, content, email, post } = req.body;
  const _id = new mongoose.Types.ObjectId();
  let date = moment().format("MMM Do YY");

  try {
    const existingPost = await Post.findById(post);

    if (!existingPost) {
      return res.status(404).json({
        message: "No Post Found",
      });
    }
    const comment = new Comment({ _id, author, content, email, date, post });
    const newcomment = await comment.save();
    res.json({
      message: "comment CREATED",
      createdcomment: newcomment,
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const updateComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const props = req.body;
  try {
    const comment = await Comment.update({ _id: commentId }, props);
    res.status(200).json({
      messgae: "comment SUCCESSFULLY UPDATED",
      comment,
      request: {
        type: "GET",
        url: `localhost:8080/comments/${comment._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
export const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findByIdAndDelete({ _id: commentId });
    if (comment) {
      res.status(200).json({
        message: "comment SUCCESSFULLY DELETED",
        comment,
        request: {
          type: "CREATE comment",
          url: `localhost:8080/comments/${comment._id}`,
        },
      });
    } else {
      res.status(404).json({
        message: "NO comment FOUND",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED",
      error: error.message,
    });
  }
};
