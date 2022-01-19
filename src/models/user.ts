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
    //TODO: There a middleware in the route to check roles. Is this necessary? good practice? should I keep it?
    enum: [USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.SALES],
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

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

export const User = model("User", userSchema);
