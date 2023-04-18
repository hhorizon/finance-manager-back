import User from "../../models/user";
import { IUser, Subscription } from "../../types";

// create user
export const createUser = async (body: IUser) => {
  const user = new User(body);

  return await user.save();
};

// find user
export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  return user;
};

export const findUserById = async (userId: string) => {
  const user = await User.findById(userId);

  return user;
};

export const findUserByVerificationToken = async (
  verificationToken: string,
) => {
  const user = await User.findOne({ verificationToken });

  return user;
};

// update user
export const updateVerifyUser = async (userId: string) => {
  const user = await User.findByIdAndUpdate(userId, {
    verify: true,
  });

  return user;
};

export const updateUserToken = async (userId: string, token: string | null) => {
  const user = await User.findByIdAndUpdate(userId, { token });

  return user;
};

export const updateUserAvatar = async (userId: string, avatarURL: string) => {
  const user = await User.findByIdAndUpdate(userId, { avatarURL });

  return user;
};

export const updateUserSubscription = async (
  userId: string,
  newSubscription: Subscription,
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { subscription: newSubscription },
    { new: true },
  );

  return user;
};

export const updateUserBalance = async (userId: string, newBalance: number) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { balance: newBalance },
    { new: true },
  );

  return user;
};
