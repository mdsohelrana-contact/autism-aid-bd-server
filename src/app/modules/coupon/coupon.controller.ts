import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { CouponService } from "./coupon.service";
import { parseQueryParams } from "../../utils/builder/parseQueryParams";

// Create coupon
const createCoupon = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const data = req.body;

  const coupon = await CouponService.createCoupon(userId, data);

  responseHandler({
    res,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Coupon created successfully",
    data: coupon,
  });
});

// Get all coupons
const getCoupons = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const query = parseQueryParams(req);

  const coupons = await CouponService.getCoupons(userId, query);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupons retrieved successfully",
    data: coupons,
  });
});

// Get single coupon
const getCouponById = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const couponId = req.params.id;

  const coupon = await CouponService.getCouponById(userId, couponId);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon retrieved successfully",
    data: coupon,
  });
});

// Update coupon
const updateCoupon = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const couponId = req.params.id;
  const data = req.body;

  const coupon = await CouponService.updateCouponById(userId, couponId, data);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon updated successfully",
    data: coupon,
  });
});

// Delete coupon
const deleteCoupon = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const couponId = req.params.id;

  const result = await CouponService.deleteCouponById(userId, couponId);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon deleted successfully",
  });
});

export const CouponController = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
