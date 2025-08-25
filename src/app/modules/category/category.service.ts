import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { checkExistsProductRelation } from "../../utils/product/checkExistsProductRelate";

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

const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      translations: true,
      children: {
        include: { translations: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
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
            deleteMany: {}, // পুরোনো translations replace করার জন্য
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
