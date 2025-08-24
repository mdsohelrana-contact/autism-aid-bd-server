import { z } from "zod";

export const addressSchema = z.object({
  body: z.object({
    label: z.string().min(1, "Label is required"), // Home, Office, etc.
    name: z.string().min(1, "Name is required"),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    city: z.string().min(1, "City is required"),
    area: z.string().optional(),
    isDefault: z.boolean().optional().default(false),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

export const updateAddressSchema = z.object({
  body: z.object({
    label: z.string().min(1, "Label is required").optional(),
    name: z.string().min(1, "Name is required").optional(),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
      .optional(),
    city: z.string().min(1, "City is required").optional(),
    area: z.string().optional(),
    isDefault: z.boolean().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});
