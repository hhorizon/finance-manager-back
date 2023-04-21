import {
  updateUserSubscription,
  updateUserBalance,
  updateUserCategories,
} from "../../repository/users";
import { HttpCode } from "../../libs/constants";
import { CustomError } from "../../middlewares";
import { generateColor } from "../../utils";
import { Subscription, AddCategoryBody } from "../../types";

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

  async updateCategories(userId: string, newCategory: AddCategoryBody) {
    const user = await updateUserCategories(userId, newCategory.type, {
      name: newCategory.name,
      color: generateColor(),
    });

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    return user.categories;
  }
}

export default new UserService();
