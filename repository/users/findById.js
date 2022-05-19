const User = require("../../models/user");

const findById = async (id) => {
  return await User.findById(id);
};

module.exports = findById;
