import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { PaymentService } from "./payment.service";

const getAllPayments = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const query = req.query;

  const payment = await PaymentService.getAllPayments(userId, query);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: payment,
  });
});

// Get payment by ID
const getPaymentById = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { paymentId } = req.params;

  const payment = await PaymentService.getPaymentById(userId, paymentId);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: payment,
  });
});

// Update payment status by ID
const updatePaymentStatusById = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { paymentId } = req.params;
  const { status } = req.body;

  const payment = await PaymentService.updatePaymentStatusById(
    userId,
    paymentId,
    { status }
  );

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment status updated successfully",
    data: payment,
  });
});

// Create payment Manual
const createManualPayment = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { orderId, amount, method, status } = req.body;

  const payment = await PaymentService.createManualPayment(
    userId,
    orderId,
    amount,
    method,
    status
  );

  responseHandler({
    res,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Payment created successfully",
    data: payment,
  });
});

export const PaymentController = {
  getAllPayments,
  getPaymentById,
  updatePaymentStatusById,
  createManualPayment,
};
