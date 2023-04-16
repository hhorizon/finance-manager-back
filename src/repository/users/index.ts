import User from "../../models/user";
import { IUser, Subscription } from "../../types";

// create user
export const createUser = async (body: IUser) => {
  const user = new User(body);

  return await user.save();
};

// find user
export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const findUserByVerificationToken = async (
  verificationToken: string,
) => {
  return await User.findOne({ verificationToken });
};

// update user
export const updateVerifyUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, {
    verify: true,
  });
};

export const updateUserToken = async (id: string, token: string | null) => {
  return await User.findByIdAndUpdate(id, { token });
};

export const updateUserAvatar = async (id: string, avatarURL: string) => {
  return await User.findByIdAndUpdate(id, { avatarURL });
};

export const updateUserSubscription = async (
  id: string,
  newSubscription: Subscription,
) => {
  return await User.findByIdAndUpdate(
    id,
    { subscription: newSubscription },
    { new: true },
  );
};
