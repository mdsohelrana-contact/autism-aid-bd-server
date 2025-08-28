import { CouponStatus, CouponType } from "@prisma/client";
import prisma from "../prisma";
import { ApplyCouponInput } from "./coupon.apply.type";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

export const applyCoupon = async (couponData: ApplyCouponInput) => {
  // 1️⃣ Fetch coupon with products & categories
  const coupon = await prisma.coupon.findFirst({
    where: {
      code: couponData.couponCode,
      isActive: true,
      status: CouponStatus.ACTIVE,
      validFrom: { lte: new Date() },
      validUntil: { gte: new Date() },
    },
    include: {
      couponProduct: { select: { productId: true } },
      couponCategory: { select: { categoryId: true } },
    },
  });

  if (!coupon) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid or expired coupon");
  }

  // 2️⃣ Usage limit check
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Coupon usage limit reached");
  }

  // 3️⃣ Per-user limit check
  if (coupon.perUserLimit) {
    const userUsageCount = await prisma.order.count({
      where: { userId: couponData.userId, couponId: coupon.id },
    });
    if (userUsageCount >= coupon.perUserLimit) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "User has reached per-user limit for this coupon"
      );
    }
  }

  // 4️⃣ Minimum cart total check
  if (
    coupon.minCartTotal &&
    Number(couponData.cartTotal) < Number(coupon.minCartTotal)
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Cart total is below the minimum required (${coupon.minCartTotal})`
    );
  }

  // 5️⃣ Determine applicable items
  let applicableItems = couponData.cartItems;
  const couponProductIds = coupon.couponProduct.map((cp) => cp.productId);
  const couponCategoryIds = coupon.couponCategory.map((cc) => cc.categoryId);

  // Filter only if coupon has specific products or categories
  if (couponProductIds.length > 0) {
    applicableItems = applicableItems.filter((item) =>
      couponProductIds.includes(item.productId)
    );
  }

  if (couponCategoryIds.length > 0) {
    applicableItems = applicableItems.filter((item) =>
      couponCategoryIds.includes(item.categoryId)
    );
  }

  // If both arrays empty → global coupon → all items apply
  if (couponProductIds.length === 0 && couponCategoryIds.length === 0) {
    applicableItems = couponData.cartItems;
  }

  if (applicableItems.length === 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Coupon not applicable to any items in cart"
    );
  }

  // 6️⃣ Calculate discount
  let discount = 0;
  for (const item of applicableItems) {
    const itemTotal = item.price * item.quantity;
    if (coupon.type === CouponType.PERCENTAGE) {
      discount += (itemTotal * Number(coupon.discount)) / 100;
    } else if (coupon.type === CouponType.FIXED) {
      // Fixed discount per item
      discount += Number(coupon.discount) * item.quantity;
    }
  }

  // 7️⃣ Return coupon + discount details
  return { coupon, discount, applicableItems };
};
