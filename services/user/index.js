const Users = require("../../repository/users");
const { CustomError } = require("../../middlewares");
const { HttpCode } = require("../../libs/constants");

class UserService {
  async updateSubscription({ id }, { subscription }) {
    const user = await Users.updateSubscription(id, subscription);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }

    return user;
  }
}

module.exports = new UserService();
