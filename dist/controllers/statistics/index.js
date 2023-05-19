"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatisticsForPeriod = void 0;
const statistics_1 = __importDefault(require("../../services/statistics"));
const constants_1 = require("../../libs/constants");
// type Params = {};
// type ResBody = {};
// type ReqBody = {};
// type ReqQuery = {
//   startDate: string;
//   endDate: string;
// };
// export const getStatisticsForPeriod: RequestHandler<
//   Params,
//   ResBody,
//   ReqBody,
//   ReqQuery
// > = async (req, res) => {
// const { startDate, endDate } = req.query;
// };
const getStatisticsForPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, user } = req;
    const statistics = yield statistics_1.default.getForPeriod(user, query.startDate, query.endDate);
    return res.status(constants_1.HttpCode.CREATED).json({
        status: "success",
        code: constants_1.HttpCode.CREATED,
        payload: { statistics },
    });
});
exports.getStatisticsForPeriod = getStatisticsForPeriod;
