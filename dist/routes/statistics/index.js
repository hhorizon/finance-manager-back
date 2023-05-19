"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statistics_1 = require("../../controllers/statistics");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.get("/", middlewares_1.guard, (0, middlewares_1.errorWrapper)(statistics_1.getStatisticsForPeriod));
// router.get("/:transactionId", guard, errorWrapper(getTransactionById));
// router.post(
//   "/",
//   guard,
//   validateBody(transactionSchema),
//   errorWrapper(addTransaction),
// );
// router.delete("/:transactionId", guard, errorWrapper(removeTransaction));
// router.put(
//   "/:transactionId",
//   guard,
//   validateBody(transactionSchema),
//   errorWrapper(updateTransaction),
// );
exports.default = router;
