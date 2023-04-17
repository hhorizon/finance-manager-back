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
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../libs/constants");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "Guest",
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    balance: {
        type: Number || null,
        default: null,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    categories: {
        type: { incoming: [String], spending: [String] },
        default: constants_1.defaultCategories,
    },
    avatarURL: {
        type: String,
        default: "avatars\\default-avatar.png",
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
        default: () => (0, uuid_1.v4)(),
    },
}, { versionKey: false });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const salt = yield bcrypt_1.default.genSalt(6);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
        }
        next();
    });
});
userSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
