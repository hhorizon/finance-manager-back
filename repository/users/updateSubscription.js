const User = require("../../models/user");

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { subscription }, { new: true });
};

module.exports = updateSubscription;
