import { z } from "zod";

export const roles = z.enum(["CUSTOMER", "ADMIN"]);

//  Create User Schema
export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }).min(1),
    email: z.string().email().optional(),
    phone: z
      .string({ error: "Phone is required" })
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number must be at most 15 digits" }),
    role: roles.optional(),
    passwordHash: z
      .string({ error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

// Update User Schema
export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }).optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number must be at most 15 digits" })
      .optional(),
    role: roles.optional(),
    passwordHash: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});
