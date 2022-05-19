const User = require("../../models/user");

const verifyUser = async (id) => {
  return await User.findOneAndUpdate(id, {
    verify: true,
  });
};

module.exports = verifyUser;
