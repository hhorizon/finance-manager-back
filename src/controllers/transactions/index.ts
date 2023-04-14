import { Request, Response } from "express";
import transactionService from "../../services/transaction";
import { HttpCode } from "../../libs/constants";

export const addTransaction = async (req: Request, res: Response) => {
  const { body, user } = req;
  const transaction = await transactionService.create(body, user);

  return res
    .status(HttpCode.CREATED)
    .json({
      status: "success",
      code: HttpCode.CREATED,
      payload: { transaction },
    });
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const { user } = req;
  const transaction = await transactionService.getById(transactionId, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { transaction },
  });
};

export const getAllTransactions = async (req: Request, res: Response) => {
  const { query, user } = req;
  const transaction = await transactionService.getAll(user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { ...transaction },
  });
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const { body, user } = req;
  const transaction = await transactionService.update(
    transactionId,
    body,
    user,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { transaction },
  });
};

// export const updateFavoriteStatusContact = async (
//   req: Request,
//   res: Response,
// ) => {
//   if (req.body.favorite === undefined) {
//     return res.status(HttpCode.BAD_REQUEST).json({
//       status: "error",
//       code: HttpCode.BAD_REQUEST,
//       message: "missing field favorite",
//     });
//   }

//   if (typeof req.body.favorite !== "boolean") {
//     return res.status(HttpCode.BAD_REQUEST).json({
//       status: "error",
//       code: HttpCode.BAD_REQUEST,
//       message: "field 'favorite' must be boolean type",
//     });
//   }

//   const { contactId } = req.params;
//   const { favorite } = req.body;
//   const { user } = req;

//   const contact = await transactionService.updateFavoriteStatus(
//     contactId,
//     favorite,
//     user,
//   );

//   return res.json({
//     status: "success",
//     code: HttpCode.OK,
//     payload: { contact },
//   });
// };

export const removeTransaction = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const { user } = req;
  const transaction = await transactionService.remove(transactionId, user);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    message: "contact deleted",
    payload: { transaction },
  });
};
