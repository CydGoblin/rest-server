import { connect } from "mongoose";

export class DB {
  static async connect() {
    if (process.env.MONGODB) {
      try {
        await connect(process.env.MONGODB);
        console.log("Connected to database");
      } catch (error) {
        console.log(error);
        throw new Error("Error on database connection");
      }
    } else {
      console.log("No database set on env");
      throw new Error("No database set on env");
    }
  }
}
