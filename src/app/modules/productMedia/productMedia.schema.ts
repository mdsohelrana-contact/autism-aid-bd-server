import { z } from "zod";

export const productMediaSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product ID is required"),
    url: z.string().url("Must be a valid URL"),
    type: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
  }),
});

export const updateProductMediaSchema = z.object({
  body: z.object({
    url: z.string().url().optional(),
    type: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
  }),
});
