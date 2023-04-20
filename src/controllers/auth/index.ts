import { Request, Response } from "express";
import path from "path";
import authService from "../../services/auth";
import { HttpCode } from "../../libs/constants";

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  const user = await authService.create(body);

  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, payload: { user } });
};

export const verifyUser = async (req: Request, res: Response) => {
  const { params } = req;

  await authService.verifyUser(params.verificationToken);

  res.sendFile(
    path.join(__dirname + "../../../../public/pages/verifyUser.html"),
  );

  return res;
};

export const signIn = async (req: Request, res: Response) => {
  const { body } = req;

  const userData = await authService.login(body);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: userData,
  });
};

export const getCurrent = async (req: Request, res: Response) => {
  const { user } = req;

  const currentUser = await authService.current(user.id);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { user: currentUser },
  });
};

export const signOut = async (req: Request, res: Response) => {
  const { user } = req;

  await authService.logout(user.id);

  return res.status(HttpCode.NO_CONTENT).json();
};

export const reverifyUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  await authService.reverifyUserEmail(email);

  // TODO add htlm
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { message: "Verification email sent" },
  });
};
