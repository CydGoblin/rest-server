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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("./src/public"));
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
