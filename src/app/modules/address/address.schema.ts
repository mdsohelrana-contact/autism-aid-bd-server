import { z } from "zod";

export const addressSchema = z.object({
 body: z.object({
      label: z.string().min(1, "Label is required"),          // Home, Office, etc.
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  line1: z.string().min(1, "Line1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  area: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  isDefault: z.boolean().optional().default(false),
  lat: z.number().optional(),
  lng: z.number().optional(),
 })
});

export const updateAddressSchema = z.object({
  body: z.object({
    label: z.string().min(1, "Label is required").optional(),
    name: z.string().min(1, "Name is required").optional(),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
      .optional(),
    line1: z.string().min(1, "Line1 is required").optional(),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required").optional(),
    area: z.string().optional(),
    postalCode: z.string().min(1, "Postal code is required").optional(),
    isDefault: z.boolean().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

