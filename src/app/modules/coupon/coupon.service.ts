import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";
import { CouponStatus } from "@prisma/client";
import prisma from "../../utils/prisma";
import { getUpdatedCouponStatus } from "../../utils/coupon/couponHelper";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";

// Create Coupon
const createCoupon = async (userId: string, data: any) => {
  // 1️⃣ Ensure user exists
  await ensureUserExists(userId);

  const now = new Date();

  // 2️⃣ Validate dates
  const validFrom = new Date(data.validFrom);
  const validUntil = new Date(data.validUntil);

  // Check validUntil > validFrom
  if (validUntil <= validFrom) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "validUntil must be after validFrom"
    );
  }

  // Check dates are not in the past
  if (validFrom < now) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "validFrom cannot be in the past"
    );
  }

  if (validUntil < now) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "validUntil cannot be in the past"
    );
  }

  const { status, isActive } = getUpdatedCouponStatus({
    validFrom: new Date(data.validFrom),
    validUntil: new Date(data.validUntil),
    usageLimit: data.usageLimit,
    usedCount: 0,
  });

  // 4️⃣ Create coupon
  const coupon = await prisma.coupon.create({
    data: {
      ...data,
      status,
      isActive,
      user: {
        connect: { id: userId },
      },
    },
  });

  return coupon;
};

// Get coupons
const getCoupons = async (userId: string, query: QueryParams) => {
  // 1️⃣ Ensure user exists
  await ensureUserExists(userId);

  // 2️⃣ Initialize PrismaQueryBuilder with query params
  const builder = new PrismaQueryBuilder(query);

  // 3️⃣ Apply search, filter, sort, paginate
  builder.search(["code"]).filter().sort().paginate();

  // 4️⃣ Build final query
  const prismaQuery = builder.build();

  // Always filter by userId
  prismaQuery.where = {
    ...prismaQuery.where,
    userId,
  };

  // 5️⃣ Fetch coupons
  const coupons = await prisma.coupon.findMany(prismaQuery);

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

  if (!coupon) {
    throw new AppError(StatusCodes.NOT_FOUND, "Coupon not found");
  }

  return coupon;
};

// Update coupon
const updateCouponById = async (
  userId: string,
  couponId: string,
  data: any
) => {
  // 1️⃣ Ensure user exists
  await ensureUserExists(userId);

  // 2️⃣ Fetch existing coupon
  const existingCoupon = await prisma.coupon.findUnique({
    where: { id: couponId, userId },
  });

  if (!existingCoupon) {
    throw new AppError(StatusCodes.NOT_FOUND, "Coupon not found");
  }

  // 3️⃣ Determine updated values
  const updatedValidFrom = data.validFrom
    ? new Date(data.validFrom)
    : existingCoupon.validFrom;
  const updatedValidUntil = data.validUntil
    ? new Date(data.validUntil)
    : existingCoupon.validUntil;
  const updatedUsageLimit =
    data.usageLimit !== undefined ? data.usageLimit : existingCoupon.usageLimit;

  // 4️⃣ Auto-expire logic
  const { status, isActive } = getUpdatedCouponStatus({
    validFrom: updatedValidFrom,
    validUntil: updatedValidUntil,
    usageLimit: updatedUsageLimit,
    usedCount: existingCoupon.usedCount,
  });

  // 5️⃣ Update coupon
  const updatedCoupon = await prisma.coupon.update({
    where: { id: couponId, userId },
    data: {
      ...data,
      status,
      isActive,
    },
  });

  return updatedCoupon;
};

/// Delete coupon
const deleteCouponById = async (userId: string, couponId: string) => {
  console.log("🚀 ~ couponId:", couponId);
  // ✅ Check user
  await ensureUserExists(userId);

  // ✅ Fetch coupon only by id
  const coupon = await prisma.coupon.findUnique({
    where: { id: couponId },
  });

  if (!coupon || coupon.userId !== userId) {
    throw new AppError(StatusCodes.NOT_FOUND, "Coupon not found");
  }

  // ✅ Delete coupon
  const deletedCoupon = await prisma.coupon.delete({
    where: { id: couponId },
  });

  return deletedCoupon;
};

export const CouponService = {
  createCoupon,
  getCoupons,
  getCouponById,
  deleteCouponById,
  updateCouponById,
};
