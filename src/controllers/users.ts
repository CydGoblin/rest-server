import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/user";
import { GetQuery, PutParams } from "../typings/controllers/users";
import { UserModel } from "../typings/models/user";

// Quety takes from ?query=1
export const usersGet = async (
  req: Request<{}, {}, {}, GetQuery>,
  res: Response
) => {
  const { limit = 5, page = 1 } = req.query;
  const calcPage = +page >= 2 ? (+page - 1) * +limit : 0;

  // We only get strings from query, convert to number
  const users = await User.find()
    .skip(calcPage)
    .limit(+limit);

  const total = await User.countDocuments();

  res.json({
    error: false,
    data: {
      total,
      users,
    },
  });
};

export const usersPost = async (
  req: Request<{}, {}, UserModel>,
  res: Response
) => {
  const { password } = req.body;
  // TODO: Sanatize
  const user = new User(req.body);

  // encript password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // save on DB
  await user.save();

  res.json({
    error: false,
    data: user,
  });
};

// Params takes from the url lie /:param1
export const usersPut = async (
  req: Request<PutParams, {}, UserModel>,
  res: Response
) => {
  const { id } = req.params;
  const { password, ...data } = req.body;

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
      ...data,
    };
  } else {
    updatedUser = {
      password,
      ...data,
    };
  }

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    if (!user) {
      res.status(400).json({
        error: true,
        message: `No user with id ${id} exist`,
      });
    }

    res.json({
      error: false,
      data: user,
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
