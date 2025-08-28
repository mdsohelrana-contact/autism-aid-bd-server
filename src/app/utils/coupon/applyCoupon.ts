import { CouponStatus, CouponType } from "@prisma/client";
import prisma from "../prisma";
import { ApplyCouponInput } from "../../modules/coupon/coupon.apply.type";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { getUpdatedCouponStatus } from "./couponHelper";

export const applyCoupon = async (couponData: ApplyCouponInput) => {
  const now = new Date();

  // Fetch coupon with product/category relations
  const coupon = await prisma.coupon.findFirst({
    where: {
      code: couponData.couponCode,
      isActive: true,
      status: CouponStatus.ACTIVE,
      validFrom: { lte: now },
      validUntil: { gte: now },
    },
    include: {
      couponProduct: { select: { productId: true } },
      couponCategory: { select: { categoryId: true } },
    },
  });

  if (!coupon) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid or expired coupon");
  }

  // Auto-expire using utility
  const { status, isActive } = getUpdatedCouponStatus(coupon);
  if (status === CouponStatus.EXPIRED) {
    await prisma.coupon.update({
      where: { id: coupon.id },
      data: { status, isActive },
    });
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Coupon expired or usage limit reached"
    );
  }

  // Per-user limit check
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

  // Minimum cart total check
  if (
    coupon.minCartTotal &&
    Number(couponData.cartTotal) < Number(coupon.minCartTotal)
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Cart total must be at least ${coupon.minCartTotal}`
    );
  }

  // Determine applicable items
  let applicableItems = couponData.cartItems;
  const productIds = coupon.couponProduct.map((cp) => cp.productId);
  const categoryIds = coupon.couponCategory.map((cc) => cc.categoryId);

  if (productIds.length) {
    applicableItems = applicableItems.filter((item) =>
      productIds.includes(item.productId)
    );
  }

  if (categoryIds.length) {
    applicableItems = applicableItems.filter((item) =>
      categoryIds.includes(item.categoryId)
    );
  }

  // Global coupon (applies to all if no specific products/categories)
  if (!productIds.length && !categoryIds.length) {
    applicableItems = couponData.cartItems;
  }

  if (!applicableItems.length) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Coupon not applicable to any cart items"
    );
  }

  // Calculate discount
  let discount = 0;
  for (const item of applicableItems) {
    const itemTotal = item.price * item.quantity;

    if (coupon.type === CouponType.PERCENTAGE) {
      discount += (itemTotal * Number(coupon.discount)) / 100;
    } else if (coupon.type === CouponType.FIXED) {
      discount += Number(coupon.discount) * item.quantity;
    }
  }

  // Return final coupon data
  return {
    coupon,
    discount,
    applicableItems,
  };
};
