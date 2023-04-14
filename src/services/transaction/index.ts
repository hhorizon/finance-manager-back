import {
  addTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
} from "../../repository/transactions";
import { CustomError } from "../../middlewares";
import { HttpCode } from "../../libs/constants";
import { ITransaction, UserDocument } from "../../types";

class TransactionService {
  async create(body: ITransaction, user: UserDocument) {
    const transaction = await addTransaction(body, user);
    return transaction;
  }

  async getById(transactionId: string, user: UserDocument) {
    const transaction = await getTransactionById(transactionId, user);
    if (!transaction) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }
    return transaction;
  }

  async getAll(user: UserDocument) {
    const transaction = await getAllTransactions(user);

    return transaction;
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
