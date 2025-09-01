import { z } from "zod";

export const createOfferBannerSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    subtitle: z.string().max(255).optional(),
    imageUrl: z.string().url().optional(),
    linkUrl: z.string().url().optional(),
    seoTitle: z.string().max(255).optional(),
    seoDesc: z.string().max(500).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
    priority: z.number().default(0),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    targetPage: z
      .enum(["HOME", "PRODUCT", "CATEGORY", "CART", "CHECKOUT", "CUSTOM"])
      .optional(),
    deviceType: z.enum(["WEB", "MOBILE", "BOTH"]).optional(),
  }),
});

export const updateOfferBannerSchema = z.object({
  body: createOfferBannerSchema.shape.body.partial(),
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const bannerIdSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});
