const User = require("../../models/user");

const create = async (body) => {
  const user = await User(body);

  return await user.save();
};

module.exports = create;
