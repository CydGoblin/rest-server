import { Types } from "mongoose";

export interface IUserModel {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  img?: string;
  role: string;
  status: boolean;
  googleOrigin: boolean;
}
