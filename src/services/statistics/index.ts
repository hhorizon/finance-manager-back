import { getTransactionsByTypeAndPeriod } from "../../repository/transactions";
import { getSatisticsByCategories } from "../../utils";
import { UserDocument } from "../../types";

class StatisticsService {
  // TODO typify req.query
  async getForPeriod(user: UserDocument, start: any, end: any) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const incomingTransactions = await getTransactionsByTypeAndPeriod(
      user.id,
      "incoming",
      startDate,
      endDate,
    );

    const spendingTransactions = await getTransactionsByTypeAndPeriod(
      user.id,
      "spending",
      startDate,
      endDate,
    );

    const incomingStatistics = getSatisticsByCategories(incomingTransactions);
    const spendingStatistics = getSatisticsByCategories(spendingTransactions);

    return { incomingStatistics, spendingStatistics };
  }
}

export default new StatisticsService();
