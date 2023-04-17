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
const jimp_1 = __importDefault(require("jimp"));
class AvatarService {
    constructor(Storage, file, user) {
        this.storage = new Storage(file, user);
        this.pathFile = file.path;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transform(this.pathFile);
            const urlOfAvatar = yield this.storage.save();
            return urlOfAvatar;
        });
    }
    transform(pathFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield jimp_1.default.read(pathFile);
            yield image
                .autocrop()
                .cover(250, 250, jimp_1.default.HORIZONTAL_ALIGN_CENTER | jimp_1.default.VERTICAL_ALIGN_MIDDLE)
                .writeAsync(pathFile);
        });
    }
}
exports.default = AvatarService;
