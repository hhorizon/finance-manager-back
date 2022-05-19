const express = require("express");

const authControllers = require("../../../controllers/auth");
const { userSchema } = require("../../../schemas/user-validation-schemes");
const {
  validateBody,
  wrapper: wrapperError,
  limiter,
  guard,
} = require("../../../middlewares");

const router = express.Router();

router.post(
  "/singup",
  limiter(15 * 60 * 1000, 50),
  validateBody(userSchema),
  wrapperError(authControllers.registration)
);
router.post(
  "/login",
  validateBody(userSchema),
  wrapperError(authControllers.login)
);

router.get("/logout", guard, wrapperError(authControllers.logout));
router.get("/current", guard, wrapperError(authControllers.getCurrent));

module.exports = router;
