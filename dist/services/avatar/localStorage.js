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
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const users_1 = require("../../repository/users");
class LocalStorage {
    constructor(file, user) {
        this.file = file;
        this.user = user;
        this.static = process.env.STATIC_FOLDER || "";
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const destination = path_1.default.join(this.static, "avatars", String(this.user.id));
            yield promises_1.default.mkdir(destination, { recursive: true });
            yield promises_1.default.rename(this.file.path, path_1.default.join(destination, this.file.filename));
            const urlOfAvatar = path_1.default.normalize(path_1.default.join("/avatars", String(this.user.id), this.file.filename));
            yield (0, users_1.updateUserAvatar)(this.user.id, urlOfAvatar);
            return urlOfAvatar;
        });
    }
}
exports.default = LocalStorage;
