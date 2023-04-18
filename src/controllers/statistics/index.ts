import { Request, Response } from "express";
import statisticsService from "../../services/statistics";
import { HttpCode } from "../../libs/constants";

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

export const getStatisticsForPeriod = async (req: Request, res: Response) => {
  const { query, user } = req;

  const statistics = await statisticsService.getForPeriod(
    user,
    query.startDate,
    query.endDate,
  );

  return res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    payload: { statistics },
  });
};
