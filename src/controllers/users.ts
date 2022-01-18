import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
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

  // Validate unique email
  const alreadyExist = await User.findOne({ email }); // { email: email }
  if (alreadyExist) {
    return res.status(400).json({
      error: true,
      message: "An user with this email already exist.",
    });
  }

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
export const usersPut = (req: Request<PutParams>, res: Response) => {
  const { id } = req.params;

  res.json({
    message: "put API",
    id,
  });
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
