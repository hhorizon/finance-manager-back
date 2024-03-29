"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserCategories = exports.updateUserBalance = exports.updateAvatar = exports.updateUserSubscription = void 0;
const user_1 = __importDefault(require("../../services/user"));
const avatar_1 = __importDefault(require("../../services/avatar"));
const localStorage_1 = __importDefault(require("../../services/avatar/localStorage"));
const constants_1 = require("../../libs/constants");
const updateUserSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const { email, subscription } = yield user_1.default.updateSubscription(user.id, body.subscription);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { email, subscription },
    });
});
exports.updateUserSubscription = updateUserSubscription;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file, user } = req;
    const avatarService = new avatar_1.default(localStorage_1.default, file, user);
    const avatarURL = yield avatarService.update();
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { avatarURL },
    });
});
exports.updateAvatar = updateAvatar;
const updateUserBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const { balance } = yield user_1.default.updateBalance(user.id, body.balance);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { balance },
    });
});
exports.updateUserBalance = updateUserBalance;
const updateUserCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const categories = yield user_1.default.updateCategories(user.id, body);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { categories },
    });
});
exports.updateUserCategories = updateUserCategories;
