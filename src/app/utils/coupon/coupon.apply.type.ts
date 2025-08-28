export interface ApplyCouponInput {
  userId: string;
  couponCode: string;
  cartItems: any[];
  cartTotal: number;
}
