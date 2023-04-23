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
exports.updateUserCategories = exports.updateUserBalance = exports.updateUserSubscription = exports.updateUserAvatar = exports.updateUserToken = exports.updateVerifyUser = exports.findUserByVerificationToken = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
// create user
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(body);
    return yield user.save();
});
exports.createUser = createUser;
// find user
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    return user;
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId);
    return user;
});
exports.findUserById = findUserById;
const findUserByVerificationToken = (verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ verificationToken });
    return user;
});
exports.findUserByVerificationToken = findUserByVerificationToken;
// update user
const updateVerifyUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(userId, {
        verify: true,
    });
    return user;
});
exports.updateVerifyUser = updateVerifyUser;
const updateUserToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(userId, { token });
    return user;
});
exports.updateUserToken = updateUserToken;
const updateUserAvatar = (userId, avatarURL) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(userId, { avatarURL });
    return user;
});
exports.updateUserAvatar = updateUserAvatar;
const updateUserSubscription = (userId, newSubscription) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(userId, { subscription: newSubscription }, { new: true });
    return user;
});
exports.updateUserSubscription = updateUserSubscription;
const updateUserBalance = (userId, newBalance) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(userId, { balance: newBalance }, { new: true });
    return user;
});
exports.updateUserBalance = updateUserBalance;
const updateUserCategories = (userId, type, newCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(userId, { $push: { [`categories.${type}`]: newCategory } }, { new: true });
    return user;
});
exports.updateUserCategories = updateUserCategories;
