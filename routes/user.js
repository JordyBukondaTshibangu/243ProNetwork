import express from "express";
import multer from "multer";

const route = express.Router();
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
route.get("/:userId", getUser);
route.post("/signup", createUser);
route.post("/login", loginUser);
route.post("/login-social-account", loginSocialAccount);
route.patch("/picture/:userId", upload.single("picture"), updateUserPicture);
route.patch("/:userId", updateUser);
route.delete("/:userId", deleteUser);

export default route;
