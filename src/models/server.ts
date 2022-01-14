import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
dotenv.config();

import { dbConnection } from "../database/config";

// Routes
import { default as userRouter } from "../routes/users";

export class Server {
  app: Express;
  port: string;

  constructor() {
    if (process.env.PORT) {
      this.port = process.env.PORT;
    } else {
      console.log("You need to set a port");
      throw new Error("No port set");
    }
    this.app = express();

    this.database();

    this.middlewares();

    this.routes();
  }

  async database() {
    await dbConnection();
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
