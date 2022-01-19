import { Router } from "express";
import { check } from "express-validator";
import { usersPatch } from "../controllers/users";
import {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} from "../controllers/users";
import { validateUser } from "../middlewares/validate-user";
import { Role } from "../models/role";

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("password", "Password required 6 or more characters").isLength({
      min: 6,
    }),
    check("email", "Invalid email").isEmail(),
    // check("role").isIn([USER_ROLES.ADMIN, USER_ROLES.USER]),
    check("role").custom(async (role = "") => {
      const roleExist = await Role.findOne({ role });
      if (!roleExist) {
        throw new Error(`The user role "${role}" does not exist on DB`);
      }
    }),
    validateUser,
  ],
  usersPost
);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

export default router;
