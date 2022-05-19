const express = require("express");

const usersControllers = require("../../../controllers/users");
const authControllers = require("../../../controllers/auth");
const {
  subscriprionSchema,
  emailSchema,
} = require("../../../schemas/user-validation-schemes");
const {
  validateBody,
  wrapper: wrapperError,
  guard,
  upload,
} = require("../../../middlewares");

const router = express.Router();

router.get(
  "/verify/:verificationToken",
  wrapperError(authControllers.verifyUser)
);

router.post(
  "/verify",
  validateBody(emailSchema),
  wrapperError(authControllers.reverifyEmail)
);

router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  wrapperError(usersControllers.updateAvatar)
);

router.patch(
  "/",
  guard,
  validateBody(subscriprionSchema),
  wrapperError(usersControllers.updateSubscription)
);

module.exports = router;
