export interface CreateOrderInput {
  userId: string;
  addressId: string;
  paymentMethod?: "BKASH" | "COD" | "CARD";
  couponCode?: string;
  shippingCharge?: number;
  taxPercent?: number;
}
