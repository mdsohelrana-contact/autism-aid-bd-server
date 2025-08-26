import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    addressId: z.string().cuid().optional(),
    paymentMethod: z.string().optional().default("COD"),
    couponCode: z.string().optional(),
  }),
});
