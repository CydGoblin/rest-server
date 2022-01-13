import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT);
