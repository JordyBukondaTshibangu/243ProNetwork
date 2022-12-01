import express from "express";
import multer from "multer";
import {
  createPost,
  deletePost,
  getComments,
  getPost,
  getPosts,
  postByUsersEmail,
  updatePost,
  userProfile,
} from "../controllers/post.js";

const route = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

route.get("/", getPosts);
route.get("/:postId", getPost);
route.get("/comments/:postId", getComments);
route.get("/profil/:email", userProfile);
route.get("/users/:email", postByUsersEmail);
route.post("/", upload.single("postImage"), createPost);
route.patch("/:postId", updatePost);
route.delete("/:postId", deletePost);

export default route;
