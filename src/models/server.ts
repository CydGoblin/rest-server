import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
dotenv.config();

// Routes
import { default as userRouter } from "../routes/users";

export class Server {
  app: Express;
  port: string;

  constructor() {
    this.port = process.env.PORT!;
    this.app = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    // Public directory
    this.app.use(express.static("./src/public"));
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/users", userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running on http://localhost:${process.env.PORT}`);
    });
  }
}
