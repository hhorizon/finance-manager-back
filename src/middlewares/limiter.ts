import rateLimit from "express-rate-limit";
import { HttpCode } from "../libs/constants";

const limiter = (duration: number, limit?: number) => {
  return rateLimit({
    windowMs: duration,
    max: limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
      res.status(HttpCode.TOO_MANY_REQUESTS).json({
        status: "error",
        code: HttpCode.TOO_MANY_REQUESTS,
        message: "Too many requests, please tyr againe later",
      });
    },
  });
};

export default limiter;
