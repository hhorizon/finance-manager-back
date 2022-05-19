const jwt = require("jsonwebtoken");

const Users = require("../../repository/users");
const { CustomError } = require("../../middlewares");
const { HttpCode } = require("../../libs/constants");
const EmailService = require("../email/service");
const SenderNodemailer = require("../email/senders/nodemailer-sender");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);

    if (user) {
      throw new CustomError(HttpCode.CONFLICT, "Email in use");
    }

    const newUser = await Users.create(body);

    // const sender = new SenderNodemailer();
    // const emailService = new EmailService(sender);
    // try {
    //   await emailService.sendMail(
    //     newUser.email,
    //     newUser.name,
    //     newUser.verificationToken
    //   );
    // } catch (error) {
    //   console.log(error);
    // }

    return {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    };
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);

    const token = this.generateToken(user);

    await Users.updateToken(user.id, token);

    const { name, subscription } = user;

    return { token, name, email, subscription };
  }

  async logout(id) {
    const user = await Users.findById(id);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    await Users.updateToken(id, null);
  }

  async current(id) {
    const user = await Users.findById(id);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    const { name, email, subscription } = user;

    return { name, email, subscription };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    if (!(await user?.isValidPassword(password))) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Password is wrong");
    }

    // if (!user?.verify) {
    //   throw new CustomError(HttpCode.BAD_REQUEST, "User not verified");
    // }

    return user;
  }

  generateToken(user) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    return token;
  }

  async verifyUser(token) {
    const user = await Users.findByVerificationToken(token);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    if (user && user.verify) {
      throw new CustomError(
        HttpCode.BAD_REQUEST,
        "Verification has already been passed"
      );
    }

    await Users.verifyUser(user.id);

    return user;
  }

  async reverifyEmail(email) {
    const user = await Users.findByEmail(email);

    if (!user) {
      throw new CustomError(HttpCode.NOT_FOUND, "User not found");
    }

    if (user && user.verify) {
      throw new CustomError(
        HttpCode.BAD_REQUEST,
        "Verification has already been passed"
      );
    }

    const sender = new SenderNodemailer();
    const emailService = new EmailService(sender);
    try {
      await emailService.sendMail(
        user.email,
        user.name,
        user.verificationToken
      );
    } catch (error) {
      console.log(error);
      throw new CustomError(
        HttpCode.SERVICE_UNAVAILABLE,
        "Error sending email"
      );
    }
  }
}

module.exports = new AuthService();
