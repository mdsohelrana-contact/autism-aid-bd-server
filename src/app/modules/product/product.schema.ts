import { z } from "zod";

export const productTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
});

export const createProductSchema = z.object({
  body: z.object({
    sku: z.string().min(1, "SKU is required"),
    name: z.string().min(2, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    benefits: z.string().min(1, "Benefits are required"),
    brand: z.string().optional().nullable(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    currency: z.string().default("BDT"),
    basePrice: z.number().min(0).optional(),
    price: z.number().min(0).optional(),
    discountPrice: z.number().min(0).optional(),
    stockQty: z.number().int().min(0).optional(),
    lowStockThreshold: z.number().int().min(0).optional(),
    isNew: z.boolean().optional(),
    isTrending: z.boolean().optional(),
    deliveryDaysMin: z.number().int().min(0).optional().nullable(),
    deliveryDaysMax: z.number().int().min(0).optional().nullable(),
    ageMin: z.number().int().min(0).optional().nullable(),
    ageMax: z.number().int().min(0).optional().nullable(),
    specs: z.any().optional().nullable(),
    tags: z.array(z.string()).optional(),

    userId: z.string().cuid(),
    categoryIds: z.array(z.string().cuid()).min(1, "At least one category is required"),
    translations: z.array(productTranslationSchema).min(1, "At least one translation is required"),
  }),
});

// Update schema: all optional
export const updateProductSchema = createProductSchema.partial();
