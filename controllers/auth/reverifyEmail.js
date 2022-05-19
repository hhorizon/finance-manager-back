const authService = require("../../services/auth");
const { HttpCode } = require("../../libs/constants");

const reverifyEmail = async (req, res) => {
  const { email } = req.body;

  await authService.reverifyEmail(email);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { message: "Verification email sent" },
  });
};

module.exports = reverifyEmail;
