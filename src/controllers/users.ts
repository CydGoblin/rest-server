import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/user";
import { GetQuery, PutParams } from "../typings/controllers/users";
import { UserModel } from "../typings/models/user";

// Query takes from ?query=1
export const usersGet = async (
  req: Request<{}, {}, {}, GetQuery>,
  res: Response
) => {
  const { limit, page = 1 } = req.query;
  const calcSkip = Number(page) >= 2 ? (Number(page) - 1) * Number(limit) : 0;
  const query = { status: true }; // Only active users

  // Depends on User
  const userPromise = User.find(query).skip(calcSkip).limit(Number(limit));
  const totalPromise = User.countDocuments(query);

  try {
    const [users, total] = await Promise.all([userPromise, totalPromise]);

    res.json({
      error: false,
      data: {
        total,
        users,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: true,
    });
  }
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

  try {
    // save on DB
    const userSaved = await user.save();

    res.json({
      error: false,
      data: user,
    });
  } catch (error) {
    console.error(error);
  }
};

// Params takes from the url like /:param1
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
    console.error(error);
  }
};

export const usersDelete = async (req: Request<PutParams>, res: Response) => {
  const { id } = req.params;

  try {
    // Delete form DB
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    res.json({
      id,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};
