import prisma from "../../utils/prisma";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";

// Create Coupon
const createCoupon = async (userId: string, data: any) => {
  // Check user
  await ensureUserExists(userId);

  const coupon = await prisma.coupon.create({
    data: {
      ...data,
      userId,
    },
  });
};

// Get coupons
const getCoupons = async (userId: string) => {
  // Check user
  await ensureUserExists(userId);

  const coupons = await prisma.coupon.findMany({
    where: {
      userId,
    },
  });

  return coupons;
};

// Get single coupon
const getCouponById = async (userId: string, couponId: string) => {
  // Check user
  await ensureUserExists(userId);

  const coupon = await prisma.coupon.findUnique({
    where: {
      id: couponId,
      userId,
    },
  });

  return coupon;
};

// Update coupon
const updateCouponById = async (
  userId: string,
  couponId: string,
  data: any
) => {
  // Check user
  await ensureUserExists(userId);

  const coupon = await prisma.coupon.update({
    where: {
      id: couponId,
      userId,
    },
    data,
  });

  return coupon;
};

// Delete coupon
const deleteCouponById = async (userId: string, couponId: string) => {
  // Check user
  await ensureUserExists(userId);

  const coupon = await prisma.coupon.delete({
    where: {
      id: couponId,
      userId,
    },
  });

  return coupon;
};

export const CouponService = {
  createCoupon,
  getCoupons,
  getCouponById,
  deleteCouponById,
  updateCouponById,
};
