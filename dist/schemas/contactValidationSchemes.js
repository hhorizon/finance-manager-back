"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.contactSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required()
        .messages({ "any.required": "missing required name field" }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
    phone: joi_1.default.number()
        .required()
        .messages({ "any.required": "missing required phone field" }),
});
