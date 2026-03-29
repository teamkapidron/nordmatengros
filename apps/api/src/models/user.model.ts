import { Schema, model } from 'mongoose';
import { UserType } from '@repo/types/user';
import { IUser } from './interfaces/user.model';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    organizationNumber: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
    userType: {
      type: String,
      enum: Object.values(UserType),
      required: false,
    },
    isApprovedByAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export default User;
