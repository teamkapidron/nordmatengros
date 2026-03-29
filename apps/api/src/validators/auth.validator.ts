import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be less than 100 characters'),
  }),
});

export const verifyOTPSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    otp: z.string().length(6, 'OTP must be 6 digits').min(1, 'OTP is required'),
  }),
});

export const resendOTPSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
  }),
});

export const onboardingSchema = z.object({
  body: z.object({
    companyName: z.string().min(1, 'Company name is required'),
    organizationNumber: z.string().min(1, 'Organization number is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .min(1, 'Password is required'),
  }),
});

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const createAdminSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>;
export type ResendOTPSchema = z.infer<typeof resendOTPSchema>;
export type OnboardingSchema = z.infer<typeof onboardingSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
export type CreateAdminSchema = z.infer<typeof createAdminSchema>;
