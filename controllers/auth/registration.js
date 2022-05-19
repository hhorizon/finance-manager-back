const authService = require("../../services/auth");
const { HttpCode } = require("../../libs/constants");

const registration = async (req, res) => {
  const user = await authService.create(req.body);

  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, payload: { user } });
};

module.exports = registration;
