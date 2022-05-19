const authService = require("../../services/auth");
const { HttpCode } = require("../../libs/constants");

const current = async (req, res) => {
  const user = await authService.current(req.user.id);

  return res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, payload: { user } });
};

module.exports = current;
