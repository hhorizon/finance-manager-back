import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { defaultCategories } from "../libs/constants";
import { UserDocument } from "../types";

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      default: "Guest",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    balance: {
      type: Number || null,
      default: null,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    categories: {
      type: {
        incoming: [{ name: String, color: String }],
        spending: [{ name: String, color: String }],
      },
      default: defaultCategories,
    },
    avatarURL: {
      type: String,
      default: "avatars\\default-avatar.png",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: () => uuidv4(),
    },
  },
  { versionKey: false },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>("user", userSchema);

export default User;
