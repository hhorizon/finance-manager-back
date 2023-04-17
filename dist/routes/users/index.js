"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../../controllers/users");
const userValidationSchemes_1 = require("../../schemas/userValidationSchemes");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.patch("/avatars", middlewares_1.guard, (0, middlewares_1.limiter)(15 * 60 * 1000, 5), middlewares_1.upload.single("avatar"), (0, middlewares_1.errorWrapper)(users_1.updateAvatar));
router.patch("/subscription", middlewares_1.guard, (0, middlewares_1.validateBody)(userValidationSchemes_1.subscriprionSchema), (0, middlewares_1.errorWrapper)(users_1.updateUserSubscription));
router.patch("/balance", middlewares_1.guard, (0, middlewares_1.validateBody)(userValidationSchemes_1.balanceSchema), (0, middlewares_1.errorWrapper)(users_1.updateUserBalance));
exports.default = router;
