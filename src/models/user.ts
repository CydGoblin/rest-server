import { UserModel, USER_ROLES } from "@typings/models/user";
import { model, Schema } from "mongoose";

export const UserSchema = new Schema<UserModel>({
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
  google: {
    type: Boolean,
    defualt: false,
  },
});

export const User = model("User", UserSchema);
