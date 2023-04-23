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
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_1 = require("../../repository/transactions");
const users_1 = require("../../repository/users");
const middlewares_1 = require("../../middlewares");
const constants_1 = require("../../libs/constants");
class TransactionService {
    create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, balance } = user;
            const { type, sum } = body;
            const newBalance = type === "incoming" ? Number(balance) + sum : Number(balance) - sum;
            yield (0, users_1.updateUserBalance)(id, newBalance);
            const transaction = yield (0, transactions_1.addTransaction)(Object.assign(Object.assign({}, body), { balance: newBalance }), id);
            return transaction;
        });
    }
    getById(transactionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield (0, transactions_1.getTransactionById)(transactionId, user.id);
            if (!transaction) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Transaction not found");
            }
            return transaction;
        });
    }
    // TODO typify req.query
    getAll(user, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, categories, balance } = user;
            const _a = yield (0, transactions_1.getAllTransactions)(id, page), { docs, totalDocs } = _a, rest = __rest(_a, ["docs", "totalDocs"]);
            return {
                categories,
                balance,
                transactions: Object.assign({ transactions: docs, totalTransaction: totalDocs }, rest),
            };
        });
    }
    update(transactionId, body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield (0, transactions_1.updateTransaction)(transactionId, body, user.id);
            if (!transaction) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Transaction not found");
            }
            return transaction;
        });
    }
    remove(transactionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield (0, transactions_1.removeTransaction)(transactionId, user.id);
            if (!transaction) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Transaction not found");
            }
            const newBalance = transaction.type === "incoming"
                ? Number(user.balance) - transaction.sum
                : Number(user.balance) + transaction.sum;
            yield (0, users_1.updateUserBalance)(user.id, newBalance);
            return transaction;
        });
    }
}
exports.default = new TransactionService();
