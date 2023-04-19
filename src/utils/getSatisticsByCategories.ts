import { ITransaction, StatisticsByCategories } from "../types";

const getSatisticsByCategories = (transactions: ITransaction[]) => {
  return transactions.reduce<StatisticsByCategories>(
    (statistics, transaction) => {
      const { category: transCategory, sum: transSum } = transaction;
      const { categories, totalSum } = statistics;

      const categoryIndex = categories.findIndex(
        (item) => item.name === transCategory.name,
      );

      categoryIndex === -1
        ? categories.push({
            name: transCategory.name,
            sum: transSum,
            color: transCategory.color,
          })
        : (categories[categoryIndex].sum += transSum);

      return {
        categories,
        totalSum: totalSum + transSum,
      };
    },
    {
      categories: [],
      totalSum: 0,
    },
  );
};

export default getSatisticsByCategories;
