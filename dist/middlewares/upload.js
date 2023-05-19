"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "";
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 500000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("image")) {
            return cb(null, true);
        }
        cb(new Error("Only images are allowed!"));
    },
});
exports.default = upload;
