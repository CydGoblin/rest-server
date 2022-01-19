import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/user";
import { GetQuery, PutParams } from "../typings/controllers/users";
import { UserModel } from "../typings/models/user";

// Quety takes from ?query=1
export const usersGet = (req: Request<{}, {}, {}, GetQuery>, res: Response) => {
  // We only get strings from query
  const { limit } = req.query;

  // Parse and convert example
  // const limits = +req.query.limit;

  res.json({
    message: "get API",
    limit,
  });
};

export const usersPost = async (
  req: Request<{}, {}, UserModel>,
  res: Response
) => {
  const { name, email, password, role } = req.body;
  // TODO: Sanatize
  const user = new User({ name, email, password, role });

  // encript password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // save on DB
  await user.save();

  res.json({
    message: "post API",
    user,
  });
};

// Params takes from the url lie /:param1
export const usersPut = async (
  req: Request<PutParams, {}, UserModel>,
  res: Response
) => {
  const { id } = req.params;
  const { password, email, ...data } = req.body;

  // To modify body
  let encryptedPassword: string;
  let updatedUser: UserModel;

  // TODO: Validate with DB
  if (password) {
    // encript password
    const salt = bcrypt.genSaltSync();
    encryptedPassword = bcrypt.hashSync(password, salt);

    updatedUser = {
      password: encryptedPassword,
      email,
      ...data,
    };
  } else {
    updatedUser = {
      password,
      email,
      ...data,
    };
  }

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json({
      message: "put API",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const usersPatch = (req: Request, res: Response) => {
  res.json({
    message: "Patch API",
  });
};

export const usersDelete = (req: Request, res: Response) => {
  res.json({
    message: "delete API",
  });
};
