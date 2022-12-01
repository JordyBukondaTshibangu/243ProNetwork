import express from "express";
import multer from "multer";
import {
  getCompanies,
  getCompanybyId,
  createCompany,
  loginCompany,
  updateCompanyPicture,
  updateCompany,
  deleteCompany,
} from "../controllers/company.js";
const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/company-profil");
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

route.get("/", getCompanies);
route.get("/:companyId", getCompanybyId);
route.post("/signup", createCompany);
route.post("/login", loginCompany);
route.patch(
  "/picture/:companyId",
  upload.single("picture"),
  updateCompanyPicture
);
route.patch("/:companyId", updateCompany);
route.delete("/:companyId", deleteCompany);

export default route;
