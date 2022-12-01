import express from "express";
import auth from "../middleware/auth.js";
const route = express.Router();
import {
  getAllJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/job.js";

route.get("/", getAllJobs);
route.get("/my-jobs", getMyJobs);
route.get("/:jobId", getJobById);
route.post("/", createJob);
route.patch("/:jobId", updateJob);
route.delete("/:jobId", deleteJob);

export default route;
