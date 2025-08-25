import { z } from "zod";

// Add item to cart
export const addItemSchema = z.object({
  body: z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().min(1).optional().default(1),
  }),
});

// Update cart item quantity
export const updateItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().min(1),
  }),
});

// Remove item
export const removeItemSchema = z.object({
  body: z.object({
    productId: z.string().cuid(),
  }),
});
