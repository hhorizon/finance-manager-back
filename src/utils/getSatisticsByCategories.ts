import { ITransaction, StatisticsByCategories } from "../types";

const getSatisticsByCategories = (transactions: ITransaction[]) => {
  return transactions.reduce<StatisticsByCategories>(
    (statistics, transaction) => {
      const { category, sum } = transaction;
      const { categories, totalSum } = statistics;

      const categoryCount = categories[category]
        ? categories[category] + sum
        : sum;

      return {
        categories: { ...categories, [category]: categoryCount },
        totalSum: totalSum + sum,
      };
    },
    {
      categories: {},
      totalSum: 0,
    },
  );
};

export default getSatisticsByCategories;
