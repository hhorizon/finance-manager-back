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
const transactions_1 = require("../../repository/transactions");
const users_1 = require("../../repository/users");
const middlewares_1 = require("../../middlewares");
const constants_1 = require("../../libs/constants");
class TransactionService {
    create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBalance = body.type === "incoming"
                ? Number(user.balance) + body.sum
                : Number(user.balance) - body.sum;
            yield (0, users_1.updateUserBalance)(user._id, newBalance);
            const transaction = yield (0, transactions_1.addTransaction)(Object.assign(Object.assign({}, body), { balance: newBalance }), user);
            return transaction;
        });
    }
    getById(transactionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield (0, transactions_1.getTransactionById)(transactionId, user);
            if (!transaction) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            return transaction;
        });
    }
    getAll(user, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield (0, transactions_1.getAllTransactions)(user, page);
            return transactions;
        });
    }
    update(transactionId, body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield (0, transactions_1.updateTransaction)(transactionId, body, user);
            if (!transaction) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            return transaction;
        });
    }
    remove(transactionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield (0, transactions_1.removeTransaction)(transactionId, user);
            if (!transaction) {
                throw new middlewares_1.CustomError(constants_1.HttpCode.NOT_FOUND, "Not found");
            }
            const newBalance = transaction.type === "incoming"
                ? Number(user.balance) - transaction.sum
                : Number(user.balance) + transaction.sum;
            yield (0, users_1.updateUserBalance)(user._id, newBalance);
            return transaction;
        });
    }
}
exports.default = new TransactionService();
