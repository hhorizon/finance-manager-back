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
const users_1 = require("../repository/users");
const constants_1 = require("../libs/constants");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const guard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    if (!verifyToken(token)) {
        return res.status(constants_1.HttpCode.UNAUTHORIZED).send({
            status: "error",
            code: constants_1.HttpCode.UNAUTHORIZED,
            message: "Not authorized",
        });
    }
    const payload = jsonwebtoken_1.default.decode(token);
    const user = yield (0, users_1.findUserById)(payload.id);
    if (!user || user.token !== token) {
        return res.status(constants_1.HttpCode.UNAUTHORIZED).send({
            status: "error",
            code: constants_1.HttpCode.UNAUTHORIZED,
            message: "Not authorized",
        });
    }
    req.user = user;
    next();
});
const verifyToken = (token) => {
    try {
        const t = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return !!t;
    }
    catch (error) {
        return false;
    }
};
exports.default = guard;
