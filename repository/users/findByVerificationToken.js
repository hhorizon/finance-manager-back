const User = require("../../models/user");

const findByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

module.exports = findByVerificationToken;
