import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb://localhost:27017/243Pro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
  console.log("connection to db open");
});
