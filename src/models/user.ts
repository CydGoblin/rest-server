import { model, Schema } from "mongoose";
import { USER_ROLES } from "../typings/constants/roles";
import { UserModel } from "../typings/models/user";

export const userSchema = new Schema<UserModel>({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [USER_ROLES.ADMIN, USER_ROLES.USER],
  },
  status: {
    type: Boolean,
    defualt: true,
  },
  googleOrigin: {
    type: Boolean,
    defualt: false,
  },
});

export const User = model("User", userSchema);
