import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product ID is required"),
    rating: z.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    comment: z.string().max(500, "Comment must be within 500 characters").optional(),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().max(500).optional(),
  }),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
});
