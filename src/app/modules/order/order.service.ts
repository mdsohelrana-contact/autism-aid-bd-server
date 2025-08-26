import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";
import { StockLogService } from "../stockLog/stockLog.service";
import { CreateOrderInput, PaymentStatusType } from "./order.type";

const createOrder = async ({
  userId,
  addressId,
  paymentMethod = "BKASH",
  couponCode,
  shippingCharge = 0,
  taxPercent = 0,
}: CreateOrderInput) => {
  // ✅ Check if user exists
  await ensureUserExists(userId);

  // ✅ Fetch cart with product details
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Cart is empty");
  }

  // ✅ Check address exists
  if (!addressId)
    throw new AppError(StatusCodes.BAD_REQUEST, "Address is required");

  const address = await prisma.address.findUnique({ where: { id: addressId } });
  if (!address) throw new AppError(StatusCodes.NOT_FOUND, "Address not found");

  // ✅ Calculate totals
  let total = 0;
  for (const item of cart.items) {
    if (!item.product) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Product ${item.productId} not found`
      );
    }

    // Use discountPrice if exists
    const priceToUse = item.product.discountPrice ?? item.product.price;
    total += Number(priceToUse) * item.quantity;

    // Optional: store basePrice & price for reference
    item.product.basePrice = item.product.basePrice ?? item.product.price;
    item.product.price = item.product.price;
  }

  // ✅ Coupon / discount logic (optional)
  let discount = 0;
  if (couponCode) {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code: couponCode,
        isActive: true,
        validFrom: { lte: new Date() },
        validUntil: { gte: new Date() },
      },
    });

    if (!coupon) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid or expired coupon");
    }

    // Apply discount only to applicable items
    const applicableItems = coupon.productIds?.length
      ? cart.items.filter((item) => coupon.productIds.includes(item.productId))
      : cart.items;

    for (const item of applicableItems) {
      if (coupon.type === "percentage") {
        discount +=
          Number(item.product.price) *
          (Number(coupon.discount) / 100) *
          item.quantity;
      } else {
        discount += Number(coupon.discount) * item.quantity;
      }
    }
  }

  // ✅ Calculate tax
  const taxAmount = (total - discount) * (taxPercent / 100);

  const finalTotal = total - discount + shippingCharge + taxAmount;

  // ✅ Transaction-safe: order creation, stock log, cart cleanup
  const order = await prisma.$transaction(async (tx) => {
    // 1️⃣ Create order
    const newOrder = await tx.order.create({
      data: {
        userId,
        addressId,
        cartId: cart.id,
        total,
        discount,
        finalTotal,
        isPaid: paymentMethod === "COD" ? false : true,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product!.price,
          })),
        },
        payments: {
          create: {
            amount: finalTotal,
            method: paymentMethod,
          },
        },
        shippingCharge,
        taxAmount,
      },
      include: {
        items: true,
        payments: true,
      },
    });

    // 2️⃣ Update stock log & product stock
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

    // 3️⃣ Clear cart items
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return newOrder;
  });

  return order;
};

// Get All Orders
const getAllOrders = async (userId: string, query: QueryParams) => {
  await ensureUserExists(userId);

  const qb = new PrismaQueryBuilder(query).filter().sort().paginate();
  const prismaQuery = qb.build();

  const data = await prisma.order.findMany({
    where: { userId, ...prismaQuery.where },
    include: {
      items: {
        include: {
          product: {
            include: {
              translations: true,
              categories: {
                include: { category: { include: { translations: true } } },
              },
              media: true,
            },
          },
        },
      },
      payments: true,
      address: true,
    },
    take: prismaQuery.take,
    skip: prismaQuery.cursorObj ? undefined : prismaQuery.skip,
    cursor: prismaQuery.cursorObj,
    orderBy: prismaQuery.orderBy,
  });

  const limit = query.limit ? Number(query.limit) : 10;
  const hasNextPage = query.cursor ? data.length === limit : false;
  const nextCursor =
    query.cursor && data.length ? data[data.length - 1].id : undefined;

  return {
    data,
    meta: {
      page: query.page ?? 1,
      limit,
      hasNextPage,
      nextCursor,
      total: query.cursor
        ? undefined
        : await prisma.order.count({ where: { userId, ...prismaQuery.where } }),
    },
  };
};

// Update payment status

const updatePaymentStatus = async (
  userId: string,
  paymentId: string,
  status: PaymentStatusType
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
    data: { status },
    include: { order: true },
  });

  // Optional: Update order status if payment succeeded
  if (status === "PAID" && payment.orderId) {
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "CONFIRMED" }, // Assuming CONFIRMED is a valid OrderStatus
    });
  }

  return updatedPayment;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  updatePaymentStatus,
};
