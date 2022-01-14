import { Request, Response } from "express";

export const usersGet = (req: Request, res: Response) => {
  res.json({
    message: "get API",
  });
};

export const usersPost = (req: Request, res: Response) => {
  res.json({
    message: "post API",
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
