import { z } from "zod";

// Main schema for creating a coupon
export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(3, "Coupon code must be at least 3 characters"),
    discount: z.number().min(0, "Discount must be positive"),
    type: z.enum(["PERCENTAGE", "FIXED"]), // match CouponType enum

    minCartTotal: z.number().optional(),

    validFrom: z.string().datetime("Invalid date format"),
    validUntil: z.string().datetime("Invalid date format"),

    usageLimit: z.number().int().positive().optional(),
    usedCount: z.number().int().nonnegative().default(0),
    perUserLimit: z.number().int().positive().optional(),

    status: z.enum(["ACTIVE", "EXPIRED", "INACTIVE"]).default("ACTIVE"),
    isActive: z.boolean().default(true),

    productIds: z.array(z.string()).default([]), // maps to CouponProduct[]
    categoryIds: z.array(z.string()).default([]), // maps to CouponCategory[]
  }),
});

// Partial schema for updates
export const updateCouponSchema = createCouponSchema.partial();
