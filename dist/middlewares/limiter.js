"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const constants_1 = require("../libs/constants");
const limiter = (duration, limit) => {
    return (0, express_rate_limit_1.default)({
        windowMs: duration,
        max: limit,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            res.status(constants_1.HttpCode.TOO_MANY_REQUESTS).json({
                status: "error",
                code: constants_1.HttpCode.TOO_MANY_REQUESTS,
                message: "Too many requests, please tyr againe later",
            });
        },
    });
};
exports.default = limiter;
