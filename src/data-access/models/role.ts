import { Schema, model } from "mongoose";
import { RoleModel } from "../../typings/models/role";

export const RoleSchema = new Schema<RoleModel>({
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

export const Role = model("Role", RoleSchema);
