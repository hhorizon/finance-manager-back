import { ObjectId, Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export type Subscription = "starter" | "pro" | "business";

export type TransactionsType = "incoming" | "spending";

export type Category = { name: string; color: string };

export type Categories = {
  incoming: Array<Category>;
  spending: Array<Category>;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  balance: number | null;
  subscription: Subscription;
  categories: Categories;
  avatarURL: string;
  token: string | null;
  verify: boolean;
  verificationToken: string;
  isValidPassword: (passwod: string) => Promise<boolean>;
}

export interface ITransaction {
  type: TransactionsType;
  category: Category;
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

export type StatisticsByCategories = {
  categories: Array<{
    name: string;
    sum: number;
    color: string;
  }>;
  totalSum: number;
};
