import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";
import { StockLogService } from "../stockLog/stockLog.service";
import { ALLOWED_STATUS_TRANSITIONS, CreateOrderInput } from "./order.type";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { applyCoupon } from "../../utils/coupon/applyCoupon";

const createOrder = async ({
  userId,
  addressId,
  paymentMethod = "BKASH",
  couponCode,
  shippingCharge = 0,
  taxPercent = 0,
}: CreateOrderInput) => {
  // ✅ Ensure user exists
  await ensureUserExists(userId);

  // ✅ Load cart with products
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              categories: true,
              couponProduct: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Cart is empty");
  }

  // ✅ Check address
  if (!addressId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Address is required");
  }
  const address = await prisma.address.findUnique({ where: { id: addressId } });
  if (!address) {
    throw new AppError(StatusCodes.NOT_FOUND, "Address not found");
  }

  // ✅ Calculate cart total
  let total = 0;
  const cartItemsForCoupon = cart.items.map((item) => {
    if (!item.product) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Product ${item.productId} not found`
      );
    }
    const price = item.product.discountPrice ?? item.product.price;
    total += Number(price) * item.quantity;
    return {
      productId: item.productId,
      categoryId: item.product.categories.map((c) => c.categoryId),
      price: Number(price),
      quantity: item.quantity,
    };
  });

  let discount = 0;
  let couponApplied: any = null;

  // ✅ Transaction for order
  const order = await prisma.$transaction(async (tx) => {
    // 🎟️ Apply coupon if provided
    if (couponCode) {
      const result = await applyCoupon({
        couponCode,
        userId,
        cartTotal: total,
        cartItems: cartItemsForCoupon,
      });
      discount = result.discount;
      couponApplied = result.coupon;

      // Update coupon usage
      await tx.coupon.update({
        where: { id: couponApplied.id },
        data: { usedCount: { increment: 1 } },
      });
    }

    const taxAmount = (total - discount) * (taxPercent / 100);
    const finalTotal = total - discount + shippingCharge + taxAmount;

    // ✅ Create order first (without items)
    const newOrder = await tx.order.create({
      data: {
        userId,
        addressId,
        cartId: cart.id,
        couponId: couponApplied?.id,
        total: Number(total),
        discount: Number(discount),
        finalTotal: Number(finalTotal),
        isPaid: paymentMethod !== "COD",
        shippingCharge: Number(shippingCharge),
        taxAmount: Number(taxAmount),
        payments: { create: { amount: finalTotal, method: paymentMethod } },
      },
      include: { payments: true },
    });

    // Add order items separately
    await tx.orderItem.createMany({
      data: cart.items.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: Number(item.quantity),
        price: Number(item.product!.discountPrice ?? item.product!.price),
      })),
    });

    // ✅ Update stock & log
    for (const item of cart.items) {
      await StockLogService.createStockLog({
        productId: item.productId,
        quantity: item.quantity,
        type: "OUT",
        note: `Order ${newOrder.id} placed`,
      });

      await tx.product.update({
        where: { id: item.productId },
        data: { stockQty: { decrement: item.quantity } },
      });
    }

    // ✅ Clear cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Return order with items
    return tx.order.findUnique({
      where: { id: newOrder.id },
      include: { items: true, payments: true },
    });
  });

  return order;
};

// Get All Orders
const getAllOrdersSummary = async (userId: string, query: QueryParams) => {
  await ensureUserExists(userId);
  try {
    // Dynamic Query Builder
    const qb = new PrismaQueryBuilder(query).filter().sort().paginate();
    const prismaQuery = qb.build();

    // Fetch Orders
    const orders = await prisma.order.findMany({
      where: {
        userId,
        ...prismaQuery.where,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                translations: {
                  where: { locale: "en" },
                  select: { name: true },
                },
                media: { select: { url: true, type: true } },
              },
            },
          },
        },
        payments: {
          select: { id: true, status: true, method: true, amount: true },
        },
        address: { select: { id: true, area: true, city: true } },
      },
      take: prismaQuery.take,
      skip: prismaQuery.cursorObj ? undefined : prismaQuery.skip,
      cursor: prismaQuery.cursorObj,
      orderBy: prismaQuery.orderBy,
    });

    // Pagination & Cursor
    const limit = query.limit ? Number(query.limit) : 10;
    const hasNextPage = query.cursor ? orders.length === limit : false;
    const nextCursor =
      query.cursor && orders.length ? orders[orders.length - 1].id : undefined;

    // Map Orders & Calculate Summary
    let totalItems = 0;
    let totalSpent = 0;
    let totalDiscount = 0;

    const data = orders.map((order) => {
      const subtotal = order.items.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
      const discount = order.discount ?? 0;
      const shipping = order.shippingCharge ?? 0;
      const tax = order.taxAmount ?? 0;
      const finalTotal = order.finalTotal;

      totalItems += order.items.reduce((sum, item) => sum + item.quantity, 0);
      totalSpent += Number(finalTotal);
      totalDiscount += Number(discount);

      return {
        id: order.id,
        status: order.status,
        isPaid: order.isPaid,
        createdAt: order.createdAt,
        subtotal,
        discount,
        shipping,
        tax,
        total: finalTotal,
        address: order.address,
        payments: order.payments,
        items: order.items.map((item) => ({
          productId: item.productId,
          name: item.product.name ?? "",
          price: item.price,
          quantity: item.quantity,
        })),
      };
    });

    // Total Count for Pagination
    const totalCount = query.cursor
      ? undefined
      : await prisma.order.count({ where: { userId, ...prismaQuery.where } });

    // Return Professional Response
    return {
      success: true,
      message: "Orders fetched successfully",
      summary: {
        totalOrders: orders.length,
        totalItems,
        totalSpent,
        totalDiscount,
      },
      data,
      meta: {
        page: query.page ?? 1,
        limit,
        hasNextPage,
        nextCursor,
        total: totalCount,
      },
    };
  } catch (err: any) {
    console.error(err);
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to fetch orders. Please check your query parameters."
    );
  }
};
const updateOrderStatus = async (
  userId: string,
  orderId: string,
  newStatus: OrderStatus
) => {
  // ✅ Ensure user exists
  await ensureUserExists(userId);

  // ✅ Transaction-safe update
  const updatedOrder = await prisma.$transaction(async (tx) => {
    // Fetch order with payments
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { payments: true },
    });

    if (!order) {
      throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
    }

    // ✅ Check if newStatus is valid transition
    const allowedNextStatuses = ALLOWED_STATUS_TRANSITIONS[order.status];
    if (!allowedNextStatuses.includes(newStatus)) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `Cannot change order status from ${order.status} to ${newStatus}`
      );
    }

    // ✅ Payment check: prevent SHIPPED/DELIVERED if payment not completed
    const hasIncompletePayment = order.payments.some(
      (p) => p.status !== PaymentStatus.PAID
    );

    const isShippedOrDelivered =
      newStatus === OrderStatus.SHIPPED || newStatus === OrderStatus.DELIVERED;

    if (hasIncompletePayment && isShippedOrDelivered) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Cannot move to SHIPPED or DELIVERED while payment is not completed"
      );
    }

    // ✅ Update order status
    const updated = await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    return updated;
  });

  return updatedOrder;
};

//
const cancelOrder = async (userId: string, orderId: string) => {
  // ✅ Check if user exists
  await ensureUserExists(userId);

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, payments: true },
  });

  if (!order) throw new AppError(404, "Order not found");

  // ✅ Check ownership
  if (order.userId !== userId) throw new AppError(403, "Forbidden");

  // Only allow cancellation for certain statuses
  if (
    order.status === OrderStatus.CANCELLED ||
    order.status === OrderStatus.RETURNED
  ) {
    throw new AppError(400, "Order already cancelled or returned");
  }

  // Determine refund percentage based on order status
  let refundPercent = 0;
  switch (order.status) {
    case OrderStatus.PENDING:
      refundPercent = 100;
      break;
    case OrderStatus.CONFIRMED:
      refundPercent = 90;
      break;
    case OrderStatus.SHIPPED:
      refundPercent = 70;
      break;
    case OrderStatus.DELIVERED:
      refundPercent = 50; // optional: or 0
      break;
    default:
      refundPercent = 0;
  }

  const refundAmount = Number(order.finalTotal) * (refundPercent / 100);

  // ✅ Transaction-safe cancellation
  const cancelledOrder = await prisma.$transaction(async (tx) => {
    // 1️⃣ Update order status
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELLED },
      include: { items: true, payments: true },
    });

    // 2️⃣ Revert stock
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockQty: { increment: item.quantity } },
      });

      await tx.stockLog.create({
        data: {
          productId: item.productId,
          quantity: item.quantity,
          type: "IN",
          note: `Order ${orderId} cancelled`,
        },
      });
    }

    // 3️⃣ Handle payments
    for (const payment of order.payments) {
      if (payment.status === PaymentStatus.PAID) {
        // Mark as REFUND_PENDING or trigger refund API
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.REFUNDED_PENDING,
            amount: refundAmount,
          },
        });
      } else if (payment.status === PaymentStatus.PENDING) {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.CANCELLED },
        });
      }
    }

    return updatedOrder;
  });

  return {
    orderId: cancelledOrder.id,
    status: OrderStatus.CANCELLED,
    refund: {
      refundPercent,
      refundAmount,
      deductionReason:
        refundPercent < 100
          ? `Refund cut due to order already ${order.status} `
          : "Not applicable",
    },
  };
};

export const OrderService = {
  createOrder,
  getAllOrdersSummary,
  updateOrderStatus,
  cancelOrder,
};
