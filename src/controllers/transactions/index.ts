import { Request, Response } from "express";
import transactionService from "../../services/transaction";
import { HttpCode } from "../../libs/constants";

export const addTransaction = async (req: Request, res: Response) => {
  const { body, user } = req;

  const transaction = await transactionService.create(body, user);

  return res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    payload: { transaction },
  });
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { params, user } = req;

  const transaction = await transactionService.getById(
    params.transactionId,
    user,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { transaction },
  });
};

export const getAllTransactions = async (req: Request, res: Response) => {
  const { query, user } = req;

  const AllTransactionsData = await transactionService.getAll(user, query.page);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: AllTransactionsData,
  });
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { user, params, body } = req;

  const transaction = await transactionService.update(
    params.transactionId,
    body,
    user,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { transaction },
  });
};

export const removeTransaction = async (req: Request, res: Response) => {
  const { params, user } = req;

  const transaction = await transactionService.remove(
    params.transactionId,
    user,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    message: "transaction deleted",
    payload: { transaction },
  });
};
