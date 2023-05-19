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
const utils_1 = require("../../utils");
class StatisticsService {
    // TODO typify req.query
    getForPeriod(user, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const incomingTransactions = yield (0, transactions_1.getTransactionsByTypeAndPeriod)(user.id, "incoming", startDate, endDate);
            const spendingTransactions = yield (0, transactions_1.getTransactionsByTypeAndPeriod)(user.id, "spending", startDate, endDate);
            const incomingStatistics = (0, utils_1.getSatisticsByCategories)(incomingTransactions);
            const spendingStatistics = (0, utils_1.getSatisticsByCategories)(spendingTransactions);
            return { incomingStatistics, spendingStatistics };
        });
    }
}
exports.default = new StatisticsService();
