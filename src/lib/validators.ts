import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8),
});

export const waitlistSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().optional(),
});

export const mentorSchema = z.object({
  name: z.string().min(2).max(120),
  role: z.string().min(2).max(120),
  bio: z.string().min(10).max(600),
  photoUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});
