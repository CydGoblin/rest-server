import { Router } from "express";
import { usersPatch } from "../controllers/users";
import {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} from "../controllers/users";

const router = Router();

router.get("/", usersGet);
router.post("/", usersPost);
router.put("/", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

export default router;
