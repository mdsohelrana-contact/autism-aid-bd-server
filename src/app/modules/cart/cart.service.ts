import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { StatusCodes } from "http-status-codes";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";
import { checkExistsProductRelation } from "../../utils/product/checkExistsProductRelate";

export interface CartItem {
  userId: string;
  productId: string;
  quantity: number;
}

const getCart = async (userId: string, query: QueryParams) => {
  // ✅ Check if user exists
  await ensureUserExists(userId);

  const qb = new PrismaQueryBuilder(query)
    .search(["product.name", "product.brand"])
    .filter()
    .sort()
    .paginate();

  const prismaQuery = qb.build();

  // Fetch cart items with products
  const items = await prisma.cartItem.findMany({
    where: { cart: { userId }, ...prismaQuery.where },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          brand: true,
          price: true,
          media: { 
            take: 1,
            select: { url: true } },
        },
      },
    },
    take: prismaQuery.take,
    skip: prismaQuery.cursorObj ? undefined : prismaQuery.skip,
    cursor: prismaQuery.cursorObj,
    orderBy: prismaQuery.orderBy,
  });

  if (!items.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "No cart items found");
  }

  // 🧮 Calculate subtotal for each item
  const data = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    subtotal: Number(item.product.price) * item.quantity,
    product: item.product,
  }));

  // 🧮 Cart summary
  const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data.reduce((sum, item) => sum + item.subtotal, 0);

  // Pagination meta
  const limit = query.limit ? Number(query.limit) : 10;
  const totalCount = await prisma.cartItem.count({
    where: { cart: { userId }, ...prismaQuery.where },
  });

  const hasNextPage = query.cursor
    ? items.length === limit
    : query.page
    ? query.page * limit < totalCount
    : false;

  const nextCursor =
    query.cursor && items.length ? items[items.length - 1].id : undefined;

  return {
    data,
    summary: {
      totalItems,
      totalPrice,
      currency: "USD", // 👉 future-ready (multi currency হলে dynamic করতে পারবেন)
    },
    meta: {
      total: query.cursor ? undefined : totalCount,
      page: query.cursor ? undefined : query.page ?? 1,
      limit,
      hasNextPage,
      nextCursor,
    },
  };
};

const addItemToCart = async (data: CartItem) => {
  if (data.quantity < 1)
    throw new AppError(StatusCodes.BAD_REQUEST, "Quantity must be at least 1");

  //   ✅ Check if user exists
  await ensureUserExists(data.userId);

  //   ✅ Check if product exists
  await checkExistsProductRelation("product", data.productId);

  const cart = await prisma.$transaction(async (prisma) => {
    let existingCart = await prisma.cart.findUnique({
      where: { userId: data.userId },
    });

    if (!existingCart) {
      existingCart = await prisma.cart.create({
        data: { userId: data.userId },
      });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: existingCart.id,
          productId: data.productId,
        },
      },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: existingCart.id,
            productId: data.productId,
          },
        },
        data: { quantity: existingItem.quantity + data.quantity },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId: existingCart.id,
        productId: data.productId,
        quantity: data.quantity,
      },
    });
  });

  return cart;
};

const updateCartItem = async (data: CartItem) => {
  if (data.quantity < 1) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Quantity must be at least 1");
  }

  // Check if user exists
  await ensureUserExists(data.userId);

  //   ✅ Check if product exists
  await checkExistsProductRelation("product", data.productId);

  const cart = await prisma.cart.findUnique({ where: { userId: data.userId } });
  if (!cart) throw new AppError(StatusCodes.NOT_FOUND, "Cart not found");

  const cartItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: data.productId } },
  });

  if (!cartItem) {
    throw new AppError(StatusCodes.NOT_FOUND, "Cart item not found");
  }

  return prisma.cartItem.update({
    where: { cartId_productId: { cartId: cart.id, productId: data.productId } },
    data: { quantity: data.quantity },
  });
};

const removeCartItem = async (userId: string, productId: string) => {
  // ✅ Check if user exists
  await ensureUserExists(userId);

  //   ✅ Check if product exists
  await checkExistsProductRelation("product", productId);

  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError(StatusCodes.NOT_FOUND, "Cart not found");

  const cartItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (!cartItem) {
    throw new AppError(StatusCodes.NOT_FOUND, "Cart item not found");
  }

  return prisma.cartItem.delete({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
};

export const CartService = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};
