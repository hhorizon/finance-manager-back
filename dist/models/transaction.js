"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["incoming", "spending"],
        required: [true, "'Type' is required field"],
    },
    category: {
        type: String,
        required: [true, "'Category' is required field"],
    },
    sum: {
        type: Number,
        required: [true, "'Sum' is required field"],
    },
    date: {
        type: Date,
        required: [true, "'Date' is required field"],
    },
    balance: {
        type: Number,
        required: [true, "'Balance' is required field"],
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    comment: {
        type: String,
    },
}, { versionKey: false });
transactionSchema.plugin(mongoose_paginate_v2_1.default);
const Transaction = (0, mongoose_1.model)("transactions", transactionSchema);
exports.default = Transaction;
