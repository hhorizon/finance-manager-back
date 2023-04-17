import Mailgen from "mailgen";

// class EmailService {
// sender: any;
// baseUrl: string;
// mailgen: any;
// constructor(sender: any) {
//   this.sender = sender;
//   this.baseUrl = process.env.BASE_URL || "";
//   this.mailgen = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Anatolii Litynskyi",
//       link: this.baseUrl,
//     },
//   });
// }
// createEmailTemplate(username: string, token: string) {
//   const email = {
//     body: {
//       name: username,
//       intro:
//         "Welcome to my pet project! Look at the code carefully and have fun.",
//       action: {
//         instructions: "To get started with Min.Manager, please click here:",
//         button: {
//           color: "#22BC66",
//           text: "Confirm your account",
//           link: `${this.baseUrl}/api/auth/verify/${token}`,
//         },
//       },
//       outro: "Need help, or have questions? Just reply to this email.",
//     },
//   };
//   return this.mailgen.generate(email);
// }
// async sendMail(email: string, username: string, token: string) {
//   const emailtemplate = this.createEmailTemplate(username, token);
//   const mailOptions = {
//     to: email,
//     subject: "Welcome to Min.Manager",
//     html: emailtemplate,
//   };
//   const result = await this.sender.send(mailOptions);
//   return result;
// }
// }

// export default EmailService;
