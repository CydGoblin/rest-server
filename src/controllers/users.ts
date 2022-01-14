import { Request, Response } from "express";
import { PostBody } from "@declarations/controllers/users";

export const usersGet = (req: Request, res: Response) => {
  res.json({
    message: "get API",
  });
};

export const usersPost = (req: Request<{}, {}, PostBody>, res: Response) => {
  const body = req.body;
  // TODO: Sanatize

  res.json({
    message: "post API",
    body,
  });
};

export const usersPut = (req: Request, res: Response) => {
  res.json({
    message: "put API",
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
