import { ObjectId, Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  name: string;
  email: string;
  password: string;
  balance: number | null;
  subscription: Subscription;
  avatarURL: string;
  token: string | null;
  verify: boolean;
  verificationToken: string;
  isValidPassword: (passwod: string) => Promise<boolean>;
}

export interface ITransaction {
  type: "incoming" | "spending";
  category: string;
  sum: number;
  date: Date;
  balance: number;
  owner: ObjectId;
  comment: string;
}

export interface UserDocument extends Document, IUser {}
export interface TransactionDocument extends Document, ITransaction {}

export type UserCredential = {
  email: string;
  password: string;
};

export type CustomJwtPayload = JwtPayload & {
  id: string;
};

export type Subscription = "starter" | "pro" | "business";
