export interface CreateOrderInput {
  userId: string;
  addressId?: string;
  paymentMethod?: string;
  couponCode?: string;
  shippingCharge?: number; // optional
  taxPercent?: number; // optional
}

