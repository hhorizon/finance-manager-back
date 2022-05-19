const { HttpCode } = require("../libs/constants");

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res
      .status(HttpCode.BAD_REQUEST)
      .json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: err.message,
      });
  }
};

module.exports = { validateBody };
