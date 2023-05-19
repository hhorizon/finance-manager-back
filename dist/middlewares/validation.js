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
exports.validateBody = void 0;
const constants_1 = require("../libs/constants");
const validateBody = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(constants_1.HttpCode.BAD_REQUEST).json({
                status: "error",
                code: constants_1.HttpCode.BAD_REQUEST,
                message: error.message,
            });
        }
    }
});
exports.validateBody = validateBody;
