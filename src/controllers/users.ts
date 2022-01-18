import { Request, Response } from "express";
import { GetQuery, PostBody, PutParams } from "../typings/controllers/users";
import { User } from "../models/user";

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
  req: Request<{}, {}, PostBody>,
  res: Response
) => {
  const body = req.body;
  // TODO: Sanatize
  const user = new User(body);

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
