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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTransaction = exports.updateTransaction = exports.getAllTransactions = exports.getTransactionById = exports.addTransaction = void 0;
const transaction_1 = __importDefault(require("../../models/transaction"));
// create transaction
const addTransaction = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_1.default.create(Object.assign(Object.assign({}, body), { owner: user.id }));
    return result;
});
exports.addTransaction = addTransaction;
// find transaction
const getTransactionById = (transactionId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_1.default.findOne({
        _id: transactionId,
        owner: user.id,
    });
    return result;
});
exports.getTransactionById = getTransactionById;
const getAllTransactions = (user, page) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield transaction_1.default.paginate({ owner: user.id }, { page, sort: { date: 1 } }), { docs: transactions, totalDocs: totalTransaction } = _a, rest = __rest(_a, ["docs", "totalDocs"]);
    const { balance } = user;
    return Object.assign({ balance, transactions, totalTransaction }, rest);
});
exports.getAllTransactions = getAllTransactions;
// update transaction
const updateTransaction = (transactionId, body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_1.default.findOneAndUpdate({
        _id: transactionId,
        owner: user.id,
    }, Object.assign({}, body), { new: true });
    return result;
});
exports.updateTransaction = updateTransaction;
// delete transaction
const removeTransaction = (transactionId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_1.default.findOneAndRemove({
        _id: transactionId,
        owner: user.id,
    });
    return result;
});
exports.removeTransaction = removeTransaction;
