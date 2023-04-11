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
import { IUser, UserCredential, UserDocument } from "../../types";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const sender = new SenderNodemailer();
const emailService = new EmailService(sender);

class AuthService {
  async create(body: IUser) {
    const user = await findUserByEmail(body.email);

    if (user) {
      throw new CustomError(HttpCode.CONFLICT, "Email in use");
    }

    const newUser = await createUser(body);

    try {
      await emailService.sendMail(
        newUser.email,
        newUser.name,
        newUser.verificationToken,
      );
    } catch (error) {
      throw new CustomError(
        HttpCode.SERVICE_UNAVAILABLE,
        "Error sending email",
      );
    }

    return {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    };
  }

  async login({ email, password }: UserCredential) {
    const user = await this.getUser(email, password);

    const token = this.generateToken(user);

    await updateUserToken(user.id, token);

    const { name, subscription } = user;

    return { token, name, email, subscription };
  }

  async logout(id: string) {
    const user = await findUserById(id);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    await updateUserToken(id, null);
  }

  async current(id: string) {
    const user = await findUserById(id);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    const { name, email, subscription } = user;

    return { name, email, subscription };
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
      console.log(error);
      throw new CustomError(
        HttpCode.SERVICE_UNAVAILABLE,
        "Error sending email",
      );
    }
  }

  generateToken(user: UserDocument) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    return token;
  }
}

export default new AuthService();
