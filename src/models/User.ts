import mongoose from 'mongoose';

import { IUser } from '../interfaces/models/User';

export interface IUserModel extends IUser, mongoose.Document {}

export const UserSchema = new mongoose.Schema<IUserModel>({
  userId: { type: String, required: true },
  notifyToken: { type: String },
  condition_591: {
    url: { type: String },
    houseId: { type: Number },
  },
});

const User = mongoose.model<IUserModel>('user', UserSchema);

export default User;
