import { Role } from "../models/role";
import { User } from "../models/user";

export const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });

  if (!roleExist) {
    throw new Error(`The user role "${role}" does not exist on DB`);
  }
};

export const uniqueEmailOnDB = async (email: string) => {
  const alreadyExist = await User.findOne({ email }); // { email: email }

  if (alreadyExist) {
    throw new Error("An user with this email already exist.");
  }
};

export const userdoesntExists = async (id: string) => {
  const alreadyExist = await User.findById(id);

  if (!alreadyExist) {
    throw new Error(`An user with ID ${id} does not exist.`);
  }
};
