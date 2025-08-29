import { OrderStatus } from "@prisma/client";

export interface CreateOrderInput {
  userId: string;
  addressId: string;
  paymentMethod?: "BKASH" | "COD" | "CARD";
  couponCode?: string;
  shippingCharge?: number;
  taxPercent?: number;
}

export const ALLOWED_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  CONFIRMED: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  SHIPPED: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
  DELIVERED: [],
  CANCELLED: [],
  RETURNED: [],
};