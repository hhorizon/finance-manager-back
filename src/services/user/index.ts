import {
  updateUserSubscription,
  updateUserBalance,
} from "../../repository/users";
import { HttpCode } from "../../libs/constants";
import { CustomError } from "../../middlewares";
import { Subscription } from "../../types";

class UserService {
  async updateSubscription(userId: string, newSubscription: Subscription) {
    const user = await updateUserSubscription(userId, newSubscription);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    return user;
  }

  async updateBalance(userId: string, newBalance: number) {
    const user = await updateUserBalance(userId, newBalance);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    return user;
  }
}

export default new UserService();
