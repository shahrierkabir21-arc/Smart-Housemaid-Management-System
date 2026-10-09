import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(3, 'Name must contain at least 3 characters').max(100),
  email: z.string().trim().toLowerCase().email('Enter a valid email address').max(254),
  password: z.string().min(8, 'Password must contain at least 8 characters').max(128),
  role: z.enum(['employer', 'housemaid']),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export const jobSchema = z.object({
  title: z.string().trim().min(5).max(120),
  location: z.string().trim().min(2).max(120),
  salary: z.coerce.number().positive().max(10000000),
  description: z.string().trim().min(20).max(4000),
});

export const descriptionSchema = z.object({
  description: z.string().trim().min(20, 'Please write at least 20 characters').max(2000),
});

export const reviewStatusSchema = z.object({ status: z.enum(['Approved', 'Rejected']) });
export type RegisterFormData = z.infer<typeof registerSchema>;
