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
    const newBalance =
      body.type === "incoming"
        ? Number(user.balance) + body.sum
        : Number(user.balance) - body.sum;

    await updateUserBalance(user._id, newBalance);

    const transaction = await addTransaction(
      { ...body, balance: newBalance },
      user,
    );

    return transaction;
  }

  async getById(transactionId: string, user: UserDocument) {
    const transaction = await getTransactionById(transactionId, user);
    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return transaction;
  }

  async getAll(user: UserDocument, page: number) {
    const transactions = await getAllTransactions(user, page);

    return transactions;
  }

  async update(transactionId: string, body: ITransaction, user: UserDocument) {
    const transaction = await updateTransaction(transactionId, body, user);
    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return transaction;
  }

  async remove(transactionId: string, user: UserDocument) {
    const transaction = await removeTransaction(transactionId, user);
    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return transaction;
  }
}

export default new TransactionService();
