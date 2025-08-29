import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";
import prisma from "../../utils/prisma";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";
import { OrderStatus, Payment, PaymentStatus } from "@prisma/client";

// Get all payments
const getAllPayments = async (userId: string, query: QueryParams) => {
  // Check user exist
  await ensureUserExists(userId);

  const qb = new PrismaQueryBuilder(query)
    .search(["method", "status"])
    .filter()
    .sort()
    .paginate();

  const prismaQuery = qb.build();

  const payment = await Promise.all([
    prisma.payment.findMany({
      ...prismaQuery,
      include: { order: true },
    }),
    prisma.payment.count({ where: prismaQuery.where }),
  ]);

  return payment;
};

// Get payment by id
const getPaymentById = async (userId: string, paymentId: string) => {
  // Check user exist
  await ensureUserExists(userId);

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });

  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Payment not found");
  }

  return payment;
};

// Update payment by id
const updatePaymentStatusById = async (
  userId: string,
  paymentId: string,
  data: Partial<Payment>
) => {
  // ✅ Check if user exists
  await ensureUserExists(userId);

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });

  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Payment not found");
  }

  const updatedPayment = await prisma.payment.update({
    where: { id: paymentId },
    data: {
      ...data,
    },
    include: { order: true },
  });

  // Optional: Update order status if payment succeeded
  if (
    data.status === PaymentStatus.PAID &&
    updatedPayment.orderId &&
    updatedPayment.order?.status !== OrderStatus.CONFIRMED
  ) {
    await prisma.order.update({
      where: { id: updatedPayment.orderId },
      data: { status: OrderStatus.CONFIRMED },
    });
  }

  return updatedPayment;
};

// Create manual payment
const createManualPayment = async (
  userId: string,
  orderId: string,
  amount: number,
  method: string,
  paymentStatus: PaymentStatus = "PAID"
) => {
  // Check user exist
  await ensureUserExists(userId);

  // Check order exist
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }

  // Create payment
  const payment = await prisma.payment.create({
    data: {
      orderId,
      amount,
      method,
      status: paymentStatus,
    },
  });

  return payment;
};

export const PaymentService = {
  getAllPayments,
  getPaymentById,
  updatePaymentStatusById,
  createManualPayment,
};
