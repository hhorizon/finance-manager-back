import { Request, Response } from "express";
import authService from "../../services/auth";
import { HttpCode } from "../../libs/constants";

export const signUp = async (req: Request, res: Response) => {
  const user = await authService.create(req.body);

  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, payload: { user } });
};

export const verifyUser = async (req: Request, res: Response) => {
  const verificationToken = req.params.verificationToken;

  await authService.verifyUser(verificationToken);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { message: "Verification successful" },
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { token, name, email, subscription } = await authService.login(
    req.body,
  );

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { token, user: { name, email, subscription } },
  });
};

export const signOut = async (req: Request, res: Response) => {
  await authService.logout(req.user.id);

  return res.status(HttpCode.NO_CONTENT).json();
};

export const getCurrent = async (req: Request, res: Response) => {
  const user = await authService.current(req.user.id);

  return res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, payload: { user } });
};

export const reverifyUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  await authService.reverifyUserEmail(email);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { message: "Verification email sent" },
  });
};
