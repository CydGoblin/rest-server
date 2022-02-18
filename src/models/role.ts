import { Schema, model } from "mongoose";
import { IRoleModel } from "./IRole";

export const RoleSchema = new Schema<IRoleModel>({
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

export const Role = model("Role", RoleSchema);
