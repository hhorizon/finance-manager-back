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
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../repository/users");
const constants_1 = require("../../libs/constants");
const middlewares_1 = require("../../middlewares");
const utils_1 = require("../../utils");
class UserService {
    updateSubscription(userId, newSubscription) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.updateUserSubscription)(userId, newSubscription);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "User not found");
            }
            return user;
        });
    }
    updateBalance(userId, newBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.updateUserBalance)(userId, newBalance);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "User not found");
            }
            return user;
        });
    }
    updateCategories(userId, newCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.updateUserCategories)(userId, newCategory.type, {
                name: newCategory.name,
                color: (0, utils_1.generateColor)(),
            });
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "User not found");
            }
            return user.categories;
        });
    }
}
exports.default = new UserService();
