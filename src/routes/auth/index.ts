import express from "express";
import {
  signUp,
  verifyUser,
  signIn,
  signOut,
  getCurrent,
  reverifyUser,
} from "../../controllers/auth";
import { userSchema, emailSchema } from "../../schemas/userValidationSchemes";
import { errorWrapper, validateBody, limiter, guard } from "../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  limiter(15 * 60 * 1000, 50),
  validateBody(userSchema),
  errorWrapper(signUp),
);

router.get("/verify/:verificationToken", errorWrapper(verifyUser));

router.post("/signin", validateBody(userSchema), errorWrapper(signIn));

router.get("/signout", guard, errorWrapper(signOut));

router.get("/current", guard, errorWrapper(getCurrent));

router.post("/verify", validateBody(emailSchema), errorWrapper(reverifyUser));

export default router;
