import { z } from "zod";

export const productBaseSchema = z.object({
  body: z.object({
    sku: z.string().min(1, "SKU is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    brand: z.string().optional().nullable(),

    userId: z.string(),

    // ✅ New fields
    description: z.string().min(1, "Description is required"),
    benefits: z.string().min(1, "Benefits are required"),

    basePrice: z
      .number({ error: "Base price must be a number" })
      .min(0, "Base price cannot be negative")
      .optional(),
    price: z
      .number({ error: "Price must be a number" })
      .min(0, "Price cannot be negative")
      .optional(),
    discountPrice: z
      .number({ error: "Discount price must be a number" })
      .min(0, "Discount price cannot be negative")
      .optional(),

    currency: z.string().default("BDT"),

    stockQty: z.number().int().min(0).optional(),
    lowStockThreshold: z.number().int().min(0).optional(),
    isNew: z.boolean().optional(),
    isTrending: z.boolean().optional(),

    deliveryDaysMin: z.number().int().min(0).optional().nullable(),
    deliveryDaysMax: z.number().int().min(0).optional().nullable(),

    specs: z.any().optional().nullable(),
    tags: z.array(z.string()).optional(),

    ageMin: z
      .number({ error: "Minimum age must be a number" })
      .int()
      .min(0, "Minimum age cannot be negative")
      .optional()
      .nullable(),
    ageMax: z
      .number({ error: "Maximum age must be a number" })
      .int()
      .min(0, "Maximum age cannot be negative")
      .optional()
      .nullable(),
  }),
});

// Separate schema for update (all optional)
export const updateProductSchema = productBaseSchema.partial();
