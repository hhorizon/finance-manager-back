import jwt from "jsonwebtoken";
import {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByVerificationToken,
  updateVerifyUser,
  updateUserToken,
} from "../../repository/users";
import EmailService from "../email/index";
import SenderNodemailer from "../email/senders/nodemailerSender";
import { HttpCode } from "../../libs/constants";
import { CustomError } from "../../middlewares";
import { IUser, UserCredential } from "../../types";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const sender = new SenderNodemailer();
const emailService = new EmailService(sender);

class AuthService {
  async create(body: IUser) {
    const user = await findUserByEmail(body.email);

    if (user) {
      throw new CustomError(HttpCode.CONFLICT, "Email in use");
    }

    const { email, name, subscription, avatarURL, verificationToken } =
      await createUser(body);

    try {
      await emailService.sendMail(email, name, verificationToken);
    } catch (error) {
      throw new CustomError(
        HttpCode.SERVICE_UNAVAILABLE,
        "Error sending email",
      );
    }

    return {
      name,
      email,
      subscription,
      avatarURL,
    };
  }

  async login(credential: UserCredential) {
    const user = await this.getUser(credential.email, credential.password);

    const token = this.generateToken(user.id);

    await updateUserToken(user.id, token);

    const { name, email, balance, subscription } = user;

    return { token, user: { name, email, balance, subscription } };
  }

  async logout(userId: string) {
    const user = await findUserById(userId);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    await updateUserToken(userId, null);
  }

  async current(userId: string) {
    const user = await findUserById(userId);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    const { name, email, balance, subscription } = user;

    return { name, email, balance, subscription };
  }

  async getUser(email: string, password: string) {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    if (!(await user?.isValidPassword(password))) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Password is wrong");
    }

    if (!user?.verify) {
      throw new CustomError(HttpCode.BAD_REQUEST, "User not verified");
    }

    return user;
  }

  async verifyUser(verificationToken: string) {
    const user = await findUserByVerificationToken(verificationToken);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    if (user && user.verify) {
      throw new CustomError(
        HttpCode.BAD_REQUEST,
        "Verification has already been passed",
      );
    }

    await updateVerifyUser(user.id);

    return user;
  }

  async reverifyUserEmail(email: string) {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    if (user && user.verify) {
      throw new CustomError(
        HttpCode.BAD_REQUEST,
        "Verification has already been passed",
      );
    }

    try {
      await emailService.sendMail(
        user.email,
        user.name,
        user.verificationToken,
      );
    } catch (error) {
      throw new CustomError(
        HttpCode.SERVICE_UNAVAILABLE,
        "Error sending email",
      );
    }
  }

  generateToken(userId: string) {
    const payload = { id: userId };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    return token;
  }
}

export default new AuthService();
