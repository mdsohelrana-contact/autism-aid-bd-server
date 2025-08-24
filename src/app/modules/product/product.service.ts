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

// Create a product
const createProduct = async (userId: string, data: any) => {
  if (!userId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User ID is missing or invalid. Please login or provide a valid user ID."
    );
  }

  await ensureUserExists(userId);

  if (!data.sku) data.sku = generateSKU(data.name);

  data.status = data.status || "ACTIVE";
  data.currency = data.currency || "BDT";
  data.stockQty = data.stockQty ?? 0;
  data.lowStockThreshold = data.lowStockThreshold ?? 3;
  data.isNew = data.isNew ?? false;
  data.isTrending = data.isTrending ?? false;

  const product = await prisma.product.create({
    data: {
      ...data,
      userId,
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
      categories: true,
      reviews: true,
    },
  });

  // Determine current page & limit
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;

  const hasNextPage = page * limit < total;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      hasNextPage,
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
  return prisma.product.update({
    where: { id },
    data,
  });
};

// Delete a product
const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
