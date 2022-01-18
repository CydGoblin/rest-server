import { Router } from "express";
import { check } from "express-validator";
import { usersPatch } from "../controllers/users";
import {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} from "../controllers/users";

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [check("email", "El correo no es válido").isEmail()],
  usersPost
);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

export default router;
