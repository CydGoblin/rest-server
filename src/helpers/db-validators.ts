import { Role } from "../models/role";

export const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`The user role "${role}" does not exist on DB`);
  }
};
