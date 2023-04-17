"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false });
contactSchema.plugin(mongoose_paginate_v2_1.default);
const Contact = (0, mongoose_1.model)("contact", contactSchema);
exports.default = Contact;
