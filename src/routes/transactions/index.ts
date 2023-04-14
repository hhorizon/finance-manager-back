import express from "express";

import {
  addTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  removeTransaction,
} from "../../controllers/transactions";
import { transactionSchema } from "../../schemas/transactionValidationSchemes";
import { errorWrapper, guard, validateBody } from "../../middlewares";

const router = express.Router();

router.get("/", guard, errorWrapper(getAllTransactions));

router.get("/:transactionId", guard, errorWrapper(getTransactionById));

router.post(
  "/",
  guard,
  validateBody(transactionSchema),
  errorWrapper(addTransaction),
);

router.delete("/:transactionId", guard, errorWrapper(removeTransaction));

router.put(
  "/:transactionId",
  guard,
  validateBody(transactionSchema),
  errorWrapper(updateTransaction),
);

export default router;
