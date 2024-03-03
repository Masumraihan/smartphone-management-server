import { z } from "zod";

export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email().max(255),
    password: z.string().min(6).max(255),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email().max(255),
    password: z.string(),
  }),
});

export const AuthValidations = { registerUserValidationSchema, loginUserValidationSchema };
