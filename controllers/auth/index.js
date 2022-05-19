const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const verifyUser = require("./verifyUser");
const reverifyEmail = require("./reverifyEmail");

module.exports = {
  registration,
  login,
  logout,
  getCurrent,
  verifyUser,
  reverifyEmail,
};
