import { Request, Response } from "express";
import userService from "../../services/user";
import AvatarService from "../../services/avatar";
import LocalStorage from "../../services/avatar/localStorage";
import { HttpCode } from "../../libs/constants";

export const updateUserSubscription = async (req: Request, res: Response) => {
  const { email, subscription } = await userService.updateSubscription(
    req.user.id,
    req.body.subscription,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { email, subscription },
  });
};

export const updateAvatar = async (req: Request, res: Response) => {
  const avatarService = new AvatarService(LocalStorage, req.file, req.user);

  const avatarURL = await avatarService.update();

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { avatarURL },
  });
};

export const updateUserBalance = async (req: Request, res: Response) => {
  const { balance } = await userService.updateBalance(
    req.user.id,
    req.body.balance,
  );

  return res.json({
    status: "success",
    code: HttpCode.OK,
    payload: { balance },
  });
};
