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
exports.reverifyUser = exports.getCurrent = exports.signOut = exports.signIn = exports.verifyUser = exports.signUp = void 0;
const auth_1 = __importDefault(require("../../services/auth"));
const constants_1 = require("../../libs/constants");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.create(req.body);
    return res
        .status(constants_1.HttpCode.CREATED)
        .json({ status: "success", code: constants_1.HttpCode.CREATED, payload: { user } });
});
exports.signUp = signUp;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationToken = req.params.verificationToken;
    yield auth_1.default.verifyUser(verificationToken);
    return res.status(constants_1.HttpCode.OK).json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { message: "Verification successful" },
    });
});
exports.verifyUser = verifyUser;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, name, email, balance, categories, subscription } = yield auth_1.default.login(req.body);
    return res.status(constants_1.HttpCode.OK).json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: {
            token,
            user: { name, email, balance, categories, subscription },
        },
    });
});
exports.signIn = signIn;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_1.default.logout(req.user.id);
    return res.status(constants_1.HttpCode.NO_CONTENT).json();
});
exports.signOut = signOut;
const getCurrent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_1.default.current(req.user.id);
    return res
        .status(constants_1.HttpCode.OK)
        .json({ status: "success", code: constants_1.HttpCode.OK, payload: { user } });
});
exports.getCurrent = getCurrent;
const reverifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield auth_1.default.reverifyUserEmail(email);
    return res.status(constants_1.HttpCode.OK).json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { message: "Verification email sent" },
    });
});
exports.reverifyUser = reverifyUser;
