"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controllers/auth");
const userValidationSchemes_1 = require("../../schemas/userValidationSchemes");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.post("/signup", (0, middlewares_1.limiter)(15 * 60 * 1000, 50), (0, middlewares_1.validateBody)(userValidationSchemes_1.userSchema), (0, middlewares_1.errorWrapper)(auth_1.signUp));
router.get("/verify/:verificationToken", (0, middlewares_1.errorWrapper)(auth_1.verifyUser));
router.post("/signin", (0, middlewares_1.validateBody)(userValidationSchemes_1.userSchema), (0, middlewares_1.errorWrapper)(auth_1.signIn));
router.get("/signout", middlewares_1.guard, (0, middlewares_1.errorWrapper)(auth_1.signOut));
router.get("/current", middlewares_1.guard, (0, middlewares_1.errorWrapper)(auth_1.getCurrent));
router.post("/verify", (0, middlewares_1.validateBody)(userValidationSchemes_1.emailSchema), (0, middlewares_1.errorWrapper)(auth_1.reverifyUser));
exports.default = router;
