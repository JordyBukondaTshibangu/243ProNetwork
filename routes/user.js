import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import {
  getUsers,
  getUser,
  createUser,
  loginUser,
  loginSocialAccount,
  updateUserPicture,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user-profil");
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

route.get("/", getUsers);
route.get("/:userId", auth, getUser);
route.post("/signup", createUser);
route.post("/login", loginUser);
route.post("/login-social-account", loginSocialAccount);
route.patch(
  "/picture/:userId",
  auth,
  upload.single("picture"),
  updateUserPicture
);
route.patch("/:userId", auth, updateUser);
route.delete("/:userId", auth, deleteUser);

export default route;
