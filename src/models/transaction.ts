import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { TransactionDocument } from "../types";

const transactionSchema = new Schema<TransactionDocument>(
  {
    type: {
      type: String,
      enum: ["incoming", "spending"],
      required: [true, "'Type' is required field"],
    },
    category: {
      type: { name: String, color: String },
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
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { versionKey: false },
);

transactionSchema.plugin(mongoosePaginate);

const Transaction = model<
  TransactionDocument,
  PaginateModel<TransactionDocument>
>("transactions", transactionSchema);

export default Transaction;
