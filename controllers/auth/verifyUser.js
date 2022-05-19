const authService = require("../../services/auth");
const { HttpCode } = require("../../libs/constants");

const verifyUser = async (req, res) => {
  const token = req.params.verificationToken;

  await authService.verifyUser(token);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { message: "Verification successful" },
  });
};

module.exports = verifyUser;
