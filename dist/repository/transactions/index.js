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
exports.removeTransaction = exports.updateTransaction = exports.getTransactionsByTypeAndPeriod = exports.getAllTransactions = exports.getTransactionById = exports.addTransaction = void 0;
const transaction_1 = __importDefault(require("../../models/transaction"));
// create transaction
const addTransaction = (body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_1.default.create(Object.assign(Object.assign({}, body), { owner: userId }));
    return transaction;
});
exports.addTransaction = addTransaction;
// find transaction
const getTransactionById = (transactionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_1.default.findOne({
        _id: transactionId,
        owner: userId,
    });
    return transaction;
});
exports.getTransactionById = getTransactionById;
const getAllTransactions = (userId, page) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_1.default.paginate({ owner: userId }, { page, sort: { date: -1 } });
    return transactions;
});
exports.getAllTransactions = getAllTransactions;
const getTransactionsByTypeAndPeriod = (userId, type, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_1.default.find({
        owner: userId,
        type,
        date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });
    return transactions;
});
exports.getTransactionsByTypeAndPeriod = getTransactionsByTypeAndPeriod;
// update transaction
const updateTransaction = (transactionId, body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_1.default.findOneAndUpdate({
        _id: transactionId,
        owner: userId,
    }, Object.assign({}, body), { new: true });
    return transaction;
});
exports.updateTransaction = updateTransaction;
// remove transaction
const removeTransaction = (transactionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_1.default.findOneAndRemove({
        _id: transactionId,
        owner: userId,
    });
    return transaction;
});
exports.removeTransaction = removeTransaction;
