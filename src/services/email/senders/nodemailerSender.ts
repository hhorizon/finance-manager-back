import nodemailer, { SendMailOptions } from "nodemailer";

class SenderNodemailer {
  config: {
    host: string;
    port: number;
    secure: boolean; // true for 465, false for other ports
    auth: {
      user: string;
      pass: string;
    };
  };

  constructor() {
    this.config = {
      host: process.env.SMTP_HOST || "",
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    };
  }

  async send(mailOptions: SendMailOptions) {
    const transporter = nodemailer.createTransport(this.config);

    const result = await transporter.sendMail({
      from: process.env.SMTP_USERNAME || "",
      ...mailOptions,
    });

    return result;
  }
}

export default SenderNodemailer;
