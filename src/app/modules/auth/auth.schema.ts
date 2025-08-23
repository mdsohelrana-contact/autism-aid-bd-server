import e from "express";
import z from "zod";

export const loginSchema = z.object({
  body: z
    .object({
      email: z.string().email().optional(),
      phone: z.string().min(10).optional(),
      password: z.string().min(6),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone is required",
      path: ["email"],
    }),
});

export const refreshSchema = z.object({
  cookies: z
    .object({
      refreshToken: z.string(),
    })
    .refine((data) => data.refreshToken, {
      message: "Refresh token is required",
      path: ["refreshToken"],
    }),
});
