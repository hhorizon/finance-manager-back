const nodemailer = require("nodemailer");

class SenderNodemailer {
  constructor() {
    this.config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };
  }

  async send(msg) {
    const transporter = nodemailer.createTransport(this.config);

    const result = await transporter.sendMail({
      ...msg,
      from: process.env.NODEMAILER_USER,
    });

    return result;
  }
}

module.exports = SenderNodemailer;
