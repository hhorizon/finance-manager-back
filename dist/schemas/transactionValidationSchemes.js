"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.transactionSchema = joi_1.default.object({
    type: joi_1.default.string()
        .valid("incoming", "spending")
        .required()
        .messages({ "any.required": "missing required name field" }),
    category: joi_1.default.object({
        name: joi_1.default.string(),
        color: joi_1.default.string(),
    })
        .required()
        .messages({ "any.required": "missing required category field" }),
    sum: joi_1.default.number()
        .min(0.5)
        .required()
        .messages({ "any.required": "missing required sum field" }),
    date: joi_1.default.date()
        .required()
        .messages({ "any.required": "missing required date field" }),
    comment: joi_1.default.string().allow(""),
});
