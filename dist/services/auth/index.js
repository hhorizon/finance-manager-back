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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../../repository/users");
const index_1 = __importDefault(require("../email/index"));
const nodemailerSender_1 = __importDefault(require("../email/senders/nodemailerSender"));
const constants_1 = require("../../libs/constants");
const middlewares_1 = require("../../middlewares");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const sender = new nodemailerSender_1.default();
const emailService = new index_1.default(sender);
class AuthService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.findUserByEmail)(body.email);
            if (user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.CONFLICT, "Email in use");
            }
            const { email, name, subscription, avatarURL, verificationToken } = yield (0, users_1.createUser)(body);
            try {
                yield emailService.sendMail(email, name, verificationToken);
            }
            catch (error) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.SERVICE_UNAVAILABLE, "Error sending email");
            }
            return {
                name,
                email,
                subscription,
                avatarURL,
            };
        });
    }
    login(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(credential.email, credential.password);
            const token = this.generateToken(user.id);
            yield (0, users_1.updateUserToken)(user.id, token);
            const { name, email, balance, subscription } = user;
            return { token, user: { name, email, balance, subscription } };
        });
    }
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.findUserById)(userId);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.UNAUTHORIZED, "Not authorized");
            }
            yield (0, users_1.updateUserToken)(userId, null);
        });
    }
    current(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.findUserById)(userId);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.UNAUTHORIZED, "Not authorized");
            }
            const { name, email, balance, subscription } = user;
            return { name, email, balance, subscription };
        });
    }
    getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.findUserByEmail)(email);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "User not found");
            }
            if (!(yield (user === null || user === void 0 ? void 0 : user.isValidPassword(password)))) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.UNAUTHORIZED, "Password is wrong");
            }
            if (!(user === null || user === void 0 ? void 0 : user.verify)) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.BAD_REQUEST, "User not verified");
            }
            return user;
        });
    }
    verifyUser(verificationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.findUserByVerificationToken)(verificationToken);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "User not found");
            }
            if (user && user.verify) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.BAD_REQUEST, "Verification has already been passed");
            }
            yield (0, users_1.updateVerifyUser)(user.id);
            return user;
        });
    }
    reverifyUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, users_1.findUserByEmail)(email);
            if (!user) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "User not found");
            }
            if (user && user.verify) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.BAD_REQUEST, "Verification has already been passed");
            }
            try {
                yield emailService.sendMail(user.email, user.name, user.verificationToken);
            }
            catch (error) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.SERVICE_UNAVAILABLE, "Error sending email");
            }
        });
    }
    generateToken(userId) {
        const payload = { id: userId };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "2h" });
        return token;
    }
}
exports.default = new AuthService();
