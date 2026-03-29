export enum UserType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export interface User {
  _id: string;
  name: string;
  email: string;
  companyName?: string;
  organizationNumber?: string;
  phoneNumber?: string;
  address?: string;
  password: string;
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  userType?: UserType;
  isApprovedByAdmin: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}
