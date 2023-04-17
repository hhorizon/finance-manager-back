"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = exports.subscriprionSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(24),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
    password: joi_1.default.string()
        .min(6)
        .max(1024)
        .required()
        .messages({ "any.required": "missing required password field" }),
});
exports.subscriprionSchema = joi_1.default.object({
    subscription: joi_1.default.string().valid("starter", "pro", "business"),
});
exports.emailSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
});