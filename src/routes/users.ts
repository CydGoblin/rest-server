import { Router } from "express";
import { check } from "express-validator";
import {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} from "../controllers/users";
import {
  isValidRole,
  uniqueEmailOnDB,
  userExists,
} from "../helpers/db-validators";
import { validateUser } from "../middlewares/validate-user";

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty().trim(),
    check("password", "Password required 6 or more characters").isLength({
      min: 6,
    }),
    check("email", "Invalid email").isEmail().normalizeEmail(),
    check("email").custom(uniqueEmailOnDB),
    // check("role").isIn([USER_ROLES.ADMIN, USER_ROLES.USER]),
    check("role").custom(isValidRole),
    check("status").toBoolean(),
    check("googleOrigin").toBoolean(),
    validateUser,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(userExists),
    validateUser,
  ],
  usersPut
);

router.delete("/:id", usersDelete);

export default router;
