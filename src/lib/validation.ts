import { z } from 'zod';

// Define your Zod validation schema
export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .min(1, { message: 'Password is required' }),
});

export type SignInForm = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
        message: 'Password must include uppercase, lowercase, number, and special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type OTPForm = z.infer<typeof otpSchema>;
