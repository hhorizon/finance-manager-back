"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgen_1 = __importDefault(require("mailgen"));
class EmailService {
    constructor(sender) {
        this.sender = sender;
        this.baseUrl = process.env.BASE_URL || "";
        this.mailgen = new mailgen_1.default({
            theme: "default",
            product: {
                name: "Anatolii Litynskyi",
                link: this.baseUrl,
            },
        });
    }
    createEmailTemplate(username, token) {
        const email = {
            body: {
                name: username,
                intro: "Welcome to my pet project! Look at the code carefully and have fun.",
                action: {
                    instructions: "To get started with Min.Manager, please click here:",
                    button: {
                        color: "#22BC66",
                        text: "Confirm your account",
                        link: `${this.baseUrl}/api/auth/verify/${token}`,
                    },
                },
                outro: "Need help, or have questions? Just reply to this email.",
            },
        };
        return this.mailgen.generate(email);
    }
    sendMail(email, username, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailtemplate = this.createEmailTemplate(username, token);
            const mailOptions = {
                to: email,
                subject: "Welcome to Min.Manager",
                html: emailtemplate,
            };
            const result = yield this.sender.send(mailOptions);
            return result;
        });
    }
}
exports.default = EmailService;
