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
exports.errorWrapper = exports.CustomError = void 0;
const constants_1 = require("../libs/constants");
class CustomError extends Error {
    constructor(statusCode, message, name = "AppError") {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
        this.name = name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
const errorWrapper = (controller) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield controller(req, res, next);
        return result;
    }
    catch (error) {
        if (error instanceof CustomError) {
            switch (error.name) {
                case "ValidationError":
                    res.status(constants_1.HttpCode.BAD_REQUEST).json({
                        status: "error",
                        code: constants_1.HttpCode.BAD_REQUEST,
                        message: error.message,
                    });
                    break;
                case "AppError":
                    res.status(error.statusCode).json({
                        status: error.status,
                        code: error.statusCode,
                        message: error.message,
                    });
                    break;
                default:
                    next(error);
                    break;
            }
        }
    }
});
exports.errorWrapper = errorWrapper;
