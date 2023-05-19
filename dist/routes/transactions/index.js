"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_1 = require("../../controllers/transactions");
const transactionValidationSchemes_1 = require("../../schemas/transactionValidationSchemes");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.get("/", middlewares_1.guard, (0, middlewares_1.errorWrapper)(transactions_1.getAllTransactions));
router.get("/:transactionId", middlewares_1.guard, (0, middlewares_1.errorWrapper)(transactions_1.getTransactionById));
router.post("/", middlewares_1.guard, (0, middlewares_1.validateBody)(transactionValidationSchemes_1.transactionSchema), (0, middlewares_1.errorWrapper)(transactions_1.addTransaction));
router.delete("/:transactionId", middlewares_1.guard, (0, middlewares_1.errorWrapper)(transactions_1.removeTransaction));
router.put("/:transactionId", middlewares_1.guard, (0, middlewares_1.validateBody)(transactionValidationSchemes_1.transactionSchema), (0, middlewares_1.errorWrapper)(transactions_1.updateTransaction));
exports.default = router;
