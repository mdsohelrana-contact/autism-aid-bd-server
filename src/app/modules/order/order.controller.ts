import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { OrderService } from "./order.service";
import { parseQueryParams } from "../../utils/builder/parseQueryParams";

// Create a new order
const createOrder = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { addressId, paymentMethod, couponCode, shippingCharge, taxPercent } = req.body;

  const order = await OrderService.createOrder({
    userId,
    addressId,
    paymentMethod,
    couponCode,
    shippingCharge,
    taxPercent,
  });
  responseHandler({
    res,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

// Get all orders
const getAllOrders = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const query = parseQueryParams(req);
  const orders = await OrderService.getAllOrders(userId, query);
  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

// Update payment status
const updatePaymentStatus = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { paymentId } = req.params;
  const { status } = req.body;

  const updatedOrder = await OrderService.updatePaymentStatus(
    userId,
    paymentId,
    status
  );
  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment status updated successfully",
    data: updatedOrder,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  updatePaymentStatus,
};
