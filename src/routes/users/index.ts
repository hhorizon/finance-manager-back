import express from "express";
import { updateUserSubscription, updateAvatar } from "../../controllers/users";
import { subscriprionSchema } from "../../schemas/userValidationSchemes";
import {
  errorWrapper,
  validateBody,
  guard,
  upload,
  limiter,
} from "../../middlewares";

const router = express.Router();

router.patch(
  "/avatars",
  guard,
  limiter(15 * 60 * 1000, 5),
  upload.single("avatar"),
  errorWrapper(updateAvatar),
);

router.patch(
  "/subscription",
  guard,
  validateBody(subscriprionSchema),
  errorWrapper(updateUserSubscription),
);

export default router;
