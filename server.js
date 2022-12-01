import express from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import "./database/mongoosedb.js";
import postsRoutes from "./routes/posts.js";
import jobsRoutes from "./routes/jobs.js";
import userRoutes from "./routes/user.js";
import companyRoutes from "./routes/company.js";
import commentsRoutes from "./routes/comment.js";
import emailRoutes from "./routes/email.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "*");
    return res.status(200).json({});
  }
  next();
});

app.use("/uploads/posts", express.static("uploads/posts"));
app.use("/uploads/user-profil", express.static("uploads/user-profil"));
app.use("/uploads/company-profil", express.static("uploads/company-profil"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use("/posts", postsRoutes);
app.use("/jobs", jobsRoutes);
app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/comments", commentsRoutes);
app.use("/", emailRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
