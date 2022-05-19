const Mailgen = require("mailgen");

class EmailService {
  constructor(sender) {
    this.sender = sender;
    this.link = "localhost:3000";
    this.mailgen = new Mailgen({
      theme: "default",
      product: {
        name: "Contacts",
        link: this.link,
      },
    });
  }

  createEmailTemplate(username, token) {
    const email = {
      body: {
        name: username,
        intro: "Welcome to Contacts! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Contacts, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return this.mailgen.generate(email);
  }

  async sendMail(email, username, token) {
    const emailtemplate = this.createEmailTemplate(username, token);

    const message = {
      to: email,
      subject: "Welcome to Contacts",
      html: emailtemplate,
    };

    const result = await this.sender.send(message);
    return result;
  }
}

module.exports = EmailService;
