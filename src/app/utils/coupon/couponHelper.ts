import { CouponStatus } from "@prisma/client";

export const getUpdatedCouponStatus = (coupon: {
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number | null;
  usedCount: number;
}) => {
  const now = new Date();
  let status: CouponStatus = CouponStatus.ACTIVE;
  let isActive = true;

  // Expired if past validUntil
  if (coupon.validUntil && new Date(coupon.validUntil) < now) {
    status = CouponStatus.EXPIRED;
    isActive = false;
  }

  // Expired if usage limit reached
  if (coupon.usageLimit !== undefined && coupon.usageLimit !== null) {
    if (coupon.usedCount >= coupon.usageLimit) {
      status = CouponStatus.EXPIRED;
      isActive = false;
    }
  }

  return { status, isActive };
};
