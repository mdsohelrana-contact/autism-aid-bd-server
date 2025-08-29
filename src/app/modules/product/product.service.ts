import { Prisma, Product } from "@prisma/client";

import { generateSKU } from "../../utils/generateSKU";
import prisma from "../../utils/prisma";
import { ProductCreateInput } from "./product.type";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import {
  PrismaQueryBuilder,
  QueryParams,
} from "../../utils/builder/PrismaQueryBuilder";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";

interface TranslationInput {
  locale: string;
  name: string;
  slug: string;
  description?: string;
}
// Create a new product           
const createProduct = async (userId: string, data: any) => {
  if (!userId) throw new AppError(StatusCodes.BAD_REQUEST, "User ID missing");

  await ensureUserExists(userId);

  // Auto-generate SKU if missing
  if (!data.sku) data.sku = generateSKU(data.name);

  // Set default values
  const productData = {
    ...data,
    status: data.status || "ACTIVE",
    currency: data.currency || "BDT",
    stockQty: data.stockQty ?? 0,
    lowStockThreshold: data.lowStockThreshold ?? 3,
    isNew: data.isNew ?? false,
    isTrending: data.isTrending ?? false,
  };

  const { categoryIds, translations, ...rest } = productData;

  // Prisma create with nested relations
  const product = await prisma.product.create({
    data: {
      ...rest,
      userId,
      translations: translations?.length
        ? {
            create: translations.map((t: any) => ({
              locale: t.locale as any,
              name: t.name,
              slug: t.slug,
              description: t.description,
              userId,
            })),
          }
        : undefined,
      categories: categoryIds?.length
        ? {
            create: categoryIds.map((id: any) => ({
              category: { connect: { id } },
            })),
          }
        : undefined,
    },
    include: {
      translations: true,
      categories: { include: { category: true } },
      media: true,
      reviews: true,
    },
  });

  return product;
};

// Get all products
const getAllProducts = async (query: QueryParams) => {
  const qb = new PrismaQueryBuilder<Product>(query)
    .search(["name", "brand", "description", "benefits"])
    .filter()
    .sort()
    .paginate();

  const prismaQuery = qb.build();

  // Fetch total count for pagination (optional)
  const total = await prisma.product.count({
    where: prismaQuery.where,
  });

  if (total === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No products found");
  }

  // Fetch products with related data
  const data = await prisma.product.findMany({
    ...prismaQuery,
    include: {
      translations: true,
      media: true,
      reviews: true,
      stockLogs: true,
      categories: {
        include: {
          category: {
            // Category details
            include: {
              translations: true, // Category translations
            },
          },
        },
      },
    },
  });

  // Determine pagination meta
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const hasNextPage = query.cursor
    ? data.length === limit
    : page * limit < (await prisma.product.count({ where: prismaQuery.where }));

  return {
    data,
    meta: {
      page: query.cursor ? undefined : page,
      limit,
      hasNextPage,
      nextCursor: query.cursor
        ? data.length
          ? data[data.length - 1].id
          : null
        : null,
    },
  };
};

// Get a single product
const getProductById = async (id: string) => {
  // Fetch main product with relations
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      translations: true,
      media: true,
      categories: true,
      reviews: true,
      stockLogs: {
        orderBy: { createdAt: "desc" },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              media: true,
            },
          },
        },
      },
    },
  });

  // Check if product exists
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  // Build related product filters
  const tagFilter =
    product.tags.length > 0 ? { hasSome: product.tags } : undefined;

  const categoryIds = product.categories.map((c) => c.categoryId);
  const categoryFilter =
    categoryIds.length > 0
      ? { some: { categoryId: { in: categoryIds } } }
      : undefined;

  // Age range overlap filter
  const ageMin = product.ageMin ?? 0;
  const ageMax = product.ageMax ?? 100;
  const ageFilter = {
    OR: [
      {
        ageMin: { lte: ageMax },
        ageMax: { gte: ageMin },
      },
    ],
  };

  // Fetch related products (tags OR categories OR age overlap)
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id }, // exclude current product
      status: "ACTIVE",
      OR: [
        ...(tagFilter ? [{ tags: tagFilter }] : []),
        ...(categoryFilter ? [{ categories: categoryFilter }] : []),
        ageFilter,
      ],
    },
    take: 5, // limit
    include: {
      translations: true,
      media: true,
      categories: true,
    },
  });

  return {
    product,
    relatedProducts,
  };
};

// Update a product
const updateProduct = async (id: string, data: Partial<ProductCreateInput>) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  if (!data.sku && data.name) {
    data.sku = generateSKU(data.name);
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data,
  });

  return updatedProduct;
};

// Delete a product
const deleteProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  const hasOrders = await prisma.orderItem.findFirst({
    where: { productId: id },
  });
  if (hasOrders) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Cannot delete product with existing orders"
    );
  }

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  return deletedProduct;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
