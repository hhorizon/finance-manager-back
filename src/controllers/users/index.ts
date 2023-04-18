import { Request, Response } from "express";
import userService from "../../services/user";
import AvatarService from "../../services/avatar";
import LocalStorage from "../../services/avatar/localStorage";
import { HttpCode } from "../../libs/constants";

export const updateUserSubscription = async (req: Request, res: Response) => {
  const { body, user } = req;

  const { email, subscription } = await userService.updateSubscription(
    user.id,
    body.subscription,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { email, subscription },
  });
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { file, user } = req;

  const avatarService = new AvatarService(LocalStorage, file, user);

  const avatarURL = await avatarService.update();

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { avatarURL },
  });
};

export const updateUserBalance = async (req: Request, res: Response) => {
  const { body, user } = req;

  const { balance } = await userService.updateBalance(user.id, body.balance);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { balance },
  });
};
