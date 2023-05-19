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
exports.removeTransaction = exports.updateTransaction = exports.getAllTransactions = exports.getTransactionById = exports.addTransaction = void 0;
const transaction_1 = __importDefault(require("../../services/transaction"));
const constants_1 = require("../../libs/constants");
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const transaction = yield transaction_1.default.create(body, user);
    return res.status(constants_1.HttpCode.CREATED).json({
        status: "success",
        code: constants_1.HttpCode.CREATED,
        payload: { transaction },
    });
});
exports.addTransaction = addTransaction;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params, user } = req;
    const transaction = yield transaction_1.default.getById(params.transactionId, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { transaction },
    });
});
exports.getTransactionById = getTransactionById;
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, user } = req;
    const AllTransactionsData = yield transaction_1.default.getAll(user, query.page);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: AllTransactionsData,
    });
});
exports.getAllTransactions = getAllTransactions;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, params, body } = req;
    const transaction = yield transaction_1.default.update(params.transactionId, body, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        payload: { transaction },
    });
});
exports.updateTransaction = updateTransaction;
const removeTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params, user } = req;
    const transaction = yield transaction_1.default.remove(params.transactionId, user);
    return res.json({
        status: "success",
        code: constants_1.HttpCode.OK,
        message: "transaction deleted",
        payload: { transaction },
    });
});
exports.removeTransaction = removeTransaction;
