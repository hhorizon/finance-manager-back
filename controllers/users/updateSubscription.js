const userService = require("../../services/user");
const { HttpCode } = require("../../libs/constants");

const updateSubscription = async (req, res) => {
  const { email, subscription } = await userService.updateSubscription(
    req.user,
    req.body
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { email, subscription },
  });
};

module.exports = updateSubscription;
