const rateLimit = require("express-rate-limit");

const { HttpCode } = require("../libs/constants");

const limiter = (duration, limit) => {
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

module.exports = limiter;
