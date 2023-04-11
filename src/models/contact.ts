import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ContactDocument } from "../types";

const contactSchema = new Schema<ContactDocument>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false },
);

contactSchema.plugin(mongoosePaginate);

const Contact = model<ContactDocument, PaginateModel<ContactDocument>>(
  "contact",
  contactSchema,
);

export default Contact;
