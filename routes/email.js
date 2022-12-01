import express from "express";
import {
  sendEmailController,
  applyJobController,
} from "../controllers/email.js";

const router = express.Router();

router.post("/send-email", sendEmailController);
router.post("/apply-job", applyJobController);

export default router;
