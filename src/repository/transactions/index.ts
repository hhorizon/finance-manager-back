import Transaction from "../../models/transaction";

import { ITransaction, TransactionsType } from "../../types";

// create transaction
export const addTransaction = async (body: ITransaction, userId: string) => {
  const transaction = await Transaction.create({
    ...body,
    owner: userId,
  });

  return transaction;
};

// find transaction
export const getTransactionById = async (
  transactionId: string,
  userId: string,
) => {
  const transaction = await Transaction.findOne({
    _id: transactionId,
    owner: userId,
  });

  return transaction;
};

export const getAllTransactions = async (userId: string, page: number) => {
  const transactions = await Transaction.paginate(
    { owner: userId },
    { page, sort: { date: -1 } },
  );

  return transactions;
};

export const getTransactionsByTypeAndPeriod = async (
  userId: string,
  type: TransactionsType,
  startDate: Date,
  endDate: Date,
) => {
  const transactions = await Transaction.find({
    owner: userId,
    type,
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: -1 });

  return transactions;
};

// update transaction
export const updateTransaction = async (
  transactionId: string,
  body: ITransaction,
  userId: string,
) => {
  const transaction = await Transaction.findOneAndUpdate(
    {
      _id: transactionId,
      owner: userId,
    },
    {
      ...body,
    },
    { new: true },
  );

  return transaction;
};

// remove transaction
export const removeTransaction = async (
  transactionId: string,
  userId: string,
) => {
  const transaction = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: userId,
  });

  return transaction;
};
