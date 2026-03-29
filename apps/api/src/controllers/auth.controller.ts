// Node Modules

// Schemas
import User from '@/models/user.model';
import Admin from '@/models/admin.model';
import Address from '@/models/address.model';
import Subscriber from '@/models/subscriber.model';

// Utils
import { sendJwt } from '@/utils/common/jwt.util';
import { sendMail } from '@/utils/common/mail.util';
import { generateOTP } from '@/utils/common/otp.util';
import { generateHash } from '@/utils/common/string.util';
import { sendResponse } from '@/utils/common/response.util';
import { generateRandomPassword } from '@/utils/common/password.util';
import { comparePassword, encryptPassword } from '@/utils/common/password.util';

// Handlers
import { asyncHandler } from '@/handlers/async.handler';
import { ErrorHandler } from '@/handlers/error.handler';

// Types
import type {
  SignupSchema,
  VerifyOTPSchema,
  ResendOTPSchema,
  OnboardingSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  AdminLoginSchema,
  CreateAdminSchema,
} from '@/validators/auth.validator';
import type { Request, Response } from 'express';

export const getUserData = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user!;

  sendResponse(res, 200, 'User data fetched successfully', { user });
});

export const getUserStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      sendResponse(res, 200, 'User not found', { user: null });
      return;
    }

    sendResponse(res, 200, 'User status fetched successfully', {
      user: {
        isApprovedByAdmin: user.isApprovedByAdmin,
      },
    });
  },
);

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as SignupSchema['body'];

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isEmailVerified) {
    throw new ErrorHandler(
      400,
      'User already exists with this email',
      'CONFLICT',
    );
  }

  const hashedPassword = await encryptPassword(password);
  const otp = generateOTP(6).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        name,
        password: hashedPassword,
        otp,
        otpExpiry,
        isEmailVerified: false,
        isApprovedByAdmin: false,
      },
    },
    { new: true, upsert: true },
  );

  await sendMail({
    to: email,
    subject: 'Bekreft din e-post',
    template: {
      type: 'verifyEmail',
      data: { name, otp },
    },
  });

  sendResponse(
    res,
    201,
    'Registration successful. Please verify your email with the OTP sent.',
    { userId: user._id },
  );
});

export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body as VerifyOTPSchema['body'];

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler(404, 'User not found', 'NOT_FOUND');
  }

  if (user.isEmailVerified) {
    throw new ErrorHandler(400, 'Email already verified', 'BAD_REQUEST');
  }

  if (user.otp !== otp) {
    throw new ErrorHandler(400, 'Invalid OTP', 'BAD_REQUEST');
  }

  if (!user.otpExpiry || new Date() > user.otpExpiry) {
    throw new ErrorHandler(400, 'OTP expired', 'BAD_REQUEST');
  }

  user.isEmailVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  await Subscriber.create({ userId: user._id });

  await sendMail({
    to: process.env.SMTP_REPLY_TO!,
    subject: 'Ny bruker registrert',
    template: {
      type: 'adminApproval',
      data: {
        name: user.name,
        email: user.email,
        userId: user._id?.toString(),
        createdAt: user.createdAt.toISOString(),
      },
    },
  });

  const payload = { id: String(user._id) };
  sendJwt(res, payload, { message: 'Email verified successfully' });
});

export const resendOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as ResendOTPSchema['body'];

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler(404, 'User not found', 'NOT_FOUND');
  }

  if (user.isEmailVerified) {
    throw new ErrorHandler(400, 'Email already verified', 'BAD_REQUEST');
  }

  const otp = generateOTP(6).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendMail({
    to: email,
    subject: 'Bekreft din e-post',
    template: {
      type: 'verifyEmail',
      data: { name: user.name, otp },
    },
  });

  sendResponse(res, 200, 'OTP resent successfully');
});

export const onboarding = asyncHandler(async (req: Request, res: Response) => {
  const {
    companyName,
    organizationNumber,
    phoneNumber,
    address,
    city,
    postalCode,
  } = req.body as OnboardingSchema['body'];

  const userId = req.user!._id;
  await User.findByIdAndUpdate(userId, {
    companyName,
    organizationNumber,
    phoneNumber,
    address: `${address}, ${city} ${postalCode}`,
  });

  await Address.create({
    userId,
    addressLine1: address,
    city,
    postalCode,
    phoneNumber,
    isDefault: true,
  });

  sendResponse(res, 200, 'Onboarding successful');
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginSchema['body'];

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ErrorHandler(401, 'Invalid email or password', 'BAD_REQUEST');
  }

  if (!user.isEmailVerified) {
    throw new ErrorHandler(
      403,
      'Please verify your email first',
      'UNAUTHORIZED',
    );
  }

  if (!user.isApprovedByAdmin) {
    throw new ErrorHandler(
      403,
      'Your account is pending admin approval',
      'UNAUTHORIZED',
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ErrorHandler(401, 'Invalid email or password', 'BAD_REQUEST');
  }

  const payload = { id: String(user._id) };
  sendJwt(res, payload, { message: 'Login successful' });
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body as ForgotPasswordSchema['body'];
    const origin = req.headers.origin;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler(404, 'User not found', 'NOT_FOUND');
    }

    const resetToken = generateHash(32);
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const resetUrl = `${origin}/reset-password/${resetToken}`;

    await sendMail({
      to: email,
      subject: 'Tilbakestill passord',
      template: {
        type: 'passwordReset',
        data: { name: user.name, resetLink: resetUrl },
      },
    });

    sendResponse(res, 200, 'Password reset link sent to your email');
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, password } = req.body as ResetPasswordSchema['body'];

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      throw new ErrorHandler(400, 'Invalid or expired token', 'BAD_REQUEST');
    }

    const hashedPassword = await encryptPassword(password);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    sendResponse(res, 200, 'Password reset successful');
  },
);

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    path: '/',
    domain: process.env.COOKIE_DOMAIN,
  });

  sendResponse(res, 200, 'Logged out successfully');
});

export const getAdminData = asyncHandler(
  async (req: Request, res: Response) => {
    const admin = req.admin!;

    sendResponse(res, 200, 'Admin data fetched successfully', { admin });
  },
);

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body as CreateAdminSchema['body'];

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ErrorHandler(
      400,
      'Admin already exists with this email',
      'CONFLICT',
    );
  }

  const password = generateRandomPassword(12);
  const hashedPassword = await encryptPassword(password);

  await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  await sendMail({
    to: email,
    subject: 'Dine admin kredensialer',
    template: {
      type: 'adminCredentials',
      data: { name, password },
    },
  });

  sendResponse(
    res,
    201,
    'Admin account created successfully. Check your email for credentials.',
  );
});

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as AdminLoginSchema['body'];

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ErrorHandler(404, 'Admin not found', 'NOT_FOUND');
  }

  const isPasswordValid = await comparePassword(password, admin.password);
  if (!isPasswordValid) {
    throw new ErrorHandler(401, 'Invalid credentials', 'BAD_REQUEST');
  }

  const payload = { id: String(admin._id) };
  sendJwt(res, payload, { message: 'Login successful' });
});
