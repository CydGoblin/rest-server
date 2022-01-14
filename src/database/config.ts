import { connect } from "mongoose";

export const dbConnection = async () => {
  try {
    if (process.env.MONGODB) {
      await connect(process.env.MONGODB);
    } else {
      console.log("No database set on env");
      throw new Error("No database set on env");
    }

    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    throw new Error("Error on database connection");
  }
};
