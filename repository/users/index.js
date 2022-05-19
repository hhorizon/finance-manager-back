const findById = require("./findById");
const findByEmail = require("./findByEmail");
const findByVerificationToken = require("./findByVerificationToken");
const create = require("./create");
const updateToken = require("./updateToken");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyUser = require("./verifyUser");

module.exports = {
  findById,
  findByEmail,
  findByVerificationToken,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
