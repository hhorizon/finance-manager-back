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
exports.updateUserBalance = exports.updateUserSubscription = exports.updateUserAvatar = exports.updateUserToken = exports.updateVerifyUser = exports.findUserByVerificationToken = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
// create user
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(body);
    return yield user.save();
});
exports.createUser = createUser;
// find user
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findById(id);
});
exports.findUserById = findUserById;
const findUserByVerificationToken = (verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ verificationToken });
});
exports.findUserByVerificationToken = findUserByVerificationToken;
// update user
const updateVerifyUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, {
        verify: true,
    });
});
exports.updateVerifyUser = updateVerifyUser;
const updateUserToken = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, { token });
});
exports.updateUserToken = updateUserToken;
const updateUserAvatar = (id, avatarURL) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, { avatarURL });
});
exports.updateUserAvatar = updateUserAvatar;
const updateUserSubscription = (id, newSubscription) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, { subscription: newSubscription }, { new: true });
});
exports.updateUserSubscription = updateUserSubscription;
const updateUserBalance = (id, newBalance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
});
exports.updateUserBalance = updateUserBalance;
