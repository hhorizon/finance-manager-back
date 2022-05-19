const User = require("../../models/user");

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

module.exports = updateToken;
