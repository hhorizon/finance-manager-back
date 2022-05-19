const User = require("../../models/user");

const updateAvatar = async (id, avatarURL) => {
  return await User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = updateAvatar;
