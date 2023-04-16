import {
  updateUserSubscription,
  updateUserBalance,
} from "../../repository/users";
import { HttpCode } from "../../libs/constants";
import { CustomError } from "../../middlewares";
import { Subscription } from "../../types";

class UserService {
  async updateSubscription(id: string, newSubscription: Subscription) {
    const user = await updateUserSubscription(id, newSubscription);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }

    return user;
  }

  async updateBalance(id: string, newBalance: number) {
    const user = await updateUserBalance(id, newBalance);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "Not found");
    }

    return user;
  }
}

export default new UserService();
