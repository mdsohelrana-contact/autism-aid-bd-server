import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { checkExistsProductRelation } from "../../utils/product/checkExistsProductRelate";
import { PrismaQueryBuilder, QueryParams } from "../../utils/builder/PrismaQueryBuilder";
import { Category } from "@prisma/client";

const createCategory = async (data: any) => {
  return prisma.category.create({
    data: {
      parentId: data.parentId,
      translations: {
        create: data.translations,
      },
    },
    include: { translations: true },
  });
};

const getAllCategories = async (query: QueryParams) => {
  // Initialize query builder
  const qb = new PrismaQueryBuilder(query)
    .search(["translations.name"])
    .filter()
    .sort()
    .paginate();

  const prismaQuery = qb.build();

  // Count total categories for pagination
  const total = await prisma.category.count({
    where: prismaQuery.where,
  });

  if (total === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No categories found");
  }

  // Fetch categories with translations and children
  const data = await prisma.category.findMany({
    ...prismaQuery,
    include: {
      translations: true,
      children: {
        include: {
          translations: true,
        },
      },
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

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      translations: true,
      parent: { include: { translations: true } },
      children: { include: { translations: true } },
    },
  });

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  return category;
};

const updateCategory = async (
  id: string,
  data: {
    parentId?: string | null;
    translations?: any[];
  }
) => {
  // Check category exist
  await checkExistsProductRelation("category", id);

  return prisma.category.update({
    where: { id },
    data: {
      parentId: data.parentId,
      translations: data.translations
        ? {
            deleteMany: {},
            create: data.translations,
          }
        : undefined,
    },
    include: { translations: true },
  });
};

const deleteCategory = async (id: string) => {
  // Check category exist
  await checkExistsProductRelation("category", id);

  return prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
