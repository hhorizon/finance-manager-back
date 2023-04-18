import {
  addTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
} from "../../repository/transactions";
import { updateUserBalance } from "../../repository/users";
import { CustomError } from "../../middlewares";
import { HttpCode } from "../../libs/constants";
import { ITransaction, UserDocument } from "../../types";

class TransactionService {
  async create(body: ITransaction, user: UserDocument) {
    const { id, balance } = user;
    const { type, sum } = body;

    const newBalance =
      type === "incoming" ? Number(balance) + sum : Number(balance) - sum;

    await updateUserBalance(id, newBalance);

    const transaction = await addTransaction(
      { ...body, balance: newBalance },
      id,
    );

    return transaction;
  }

  async getById(transactionId: string, user: UserDocument) {
    const transaction = await getTransactionById(transactionId, user.id);

    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found");
    }

    return transaction;
  }

  // TODO typify req.query
  async getAll(user: UserDocument, page: any) {
    const { id, categories, balance } = user;

    const { docs, totalDocs, ...rest } = await getAllTransactions(id, page);

    return {
      categories,
      balance,
      transactions: {
        transactions: docs,
        totalTransaction: totalDocs,
        ...rest,
      },
    };
  }

  async update(transactionId: string, body: ITransaction, user: UserDocument) {
    const transaction = await updateTransaction(transactionId, body, user.id);

    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found");
    }

    return transaction;
  }

  async remove(transactionId: string, user: UserDocument) {
    const transaction = await removeTransaction(transactionId, user.id);

    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found");
    }

    const newBalance =
      transaction.type === "incoming"
        ? Number(user.balance) - transaction.sum
        : Number(user.balance) + transaction.sum;

    await updateUserBalance(user.id, newBalance);

    return transaction;
  }
}

export default new TransactionService();
