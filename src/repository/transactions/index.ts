import Transaction from "../../models/transaction";
import { ITransaction, UserDocument } from "../../types";

// create transaction
export const addTransaction = async (
  body: ITransaction,
  user: UserDocument,
) => {
  const result = await Transaction.create({ ...body, owner: user.id });

  return result;
};

// find transaction
export const getTransactionById = async (
  transactionId: string,
  user: UserDocument,
) => {
  const result = await Transaction.findOne({
    _id: transactionId,
    owner: user.id,
  });

  return result;
};

export const getAllTransactions = async (user: UserDocument) => {
  const {
    docs: transaction,
    totalDocs: totalTransaction,
    ...rest
  } = await Transaction.paginate({ owner: user.id });

  return { transaction, totalTransaction, ...rest };
};

// update transaction
export const updateTransaction = async (
  transactionId: string,
  body: ITransaction,
  user: UserDocument,
) => {
  const result = await Transaction.findOneAndUpdate(
    {
      _id: transactionId,
      owner: user.id,
    },
    {
      ...body,
    },
    { new: true },
  );

  return result;
};

// export const updateFavoriteStatusContact = async (
//   contactId: string,
//   favorite: boolean,
//   user: UserDocument,
// ) => {
//   const result = await Transaction.findOneAndUpdate(
//     {
//       _id: contactId,
//       owner: user.id,
//     },
//     { favorite },
//     { new: true },
//   );

//   return result;
// };

// delete transaction
export const removeTransaction = async (
  transactionId: string,
  user: UserDocument,
) => {
  const result = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: user.id,
  });

  return result;
};
