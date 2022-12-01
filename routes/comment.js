import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.js";

const route = express.Router();

route.get("/", getComments);
route.post("/", createComment);
route.patch("/:commentId", updateComment);
route.delete("/:commentId", deleteComment);

export default route;
