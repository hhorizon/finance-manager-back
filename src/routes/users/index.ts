import express from "express";
import {
  updateUserSubscription,
  updateAvatar,
  updateUserBalance,
  updateUserCategories,
} from "../../controllers/users";
import {
  subscriprionSchema,
  balanceSchema,
  categorySchema,
} from "../../schemas/userValidationSchemes";
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

router.patch(
  "/balance",
  guard,
  validateBody(balanceSchema),
  errorWrapper(updateUserBalance),
);

router.patch(
  "/categories",
  guard,
  validateBody(categorySchema),
  errorWrapper(updateUserCategories),
);

export default router;
