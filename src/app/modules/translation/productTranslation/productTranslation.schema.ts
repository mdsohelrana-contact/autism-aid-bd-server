// src/modules/productTranslation/productTranslation.schema.ts
import { z } from "zod";

export const productTranslationBaseSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product ID is required"),
    userId: z.string().min(1, "User ID is required"), 
    locale: z.enum(["en", "bn", "es"]).default("en"),
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),

    seoTitle: z.string().optional().nullable(),
    seoDesc: z.string().optional().nullable(),
    shortDesc: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    usage: z.string().optional().nullable(),
    benefits: z.string().optional().nullable(),
  }),
});

export const productTranslationUpdateSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    userId: z.string().optional(),
    locale: z.enum(["en", "bn", "es"]).optional(),
    name: z.string().optional(),
    slug: z.string().optional(),

    seoTitle: z.string().optional().nullable(),
    seoDesc: z.string().optional().nullable(),
    shortDesc: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    usage: z.string().optional().nullable(),
    benefits: z.string().optional().nullable(),
  }),
});
