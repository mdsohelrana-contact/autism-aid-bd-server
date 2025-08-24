import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";


// Create a product translation
const createProductTranslation = async (userId: string, data: any) => {
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }
   data.userId = userId;

  return prisma.productTranslation.create({
    data,
  });
};

// Get all translations for a product
const getTranslationsByProduct = async (productId: string) => {
  const translations = await prisma.productTranslation.findMany({
    where: { productId },
  });

  if (!translations || translations.length === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No translations found for this product"
    );
  }

  return translations;
};

// Get a single translation
const getTranslationById = async (id: string) => {
  const translation = await prisma.productTranslation.findUnique({
    where: { id },
  });

  if (!translation) {
    throw new AppError(StatusCodes.NOT_FOUND, "Translation not found");
  }

  return translation;
};

// Update a translation
const updateTranslation = async (id: string, data: any) => {
  const translation = await prisma.productTranslation.findUnique({
    where: { id },
  });
  if (!translation) {
    throw new AppError(StatusCodes.NOT_FOUND, "Translation not found");
  }

  return prisma.productTranslation.update({
    where: { id },
    data,
  });
};

// Delete a translation
const deleteTranslation = async (id: string) => {
  const translation = await prisma.productTranslation.findUnique({
    where: { id },
  });
  if (!translation) {
    throw new AppError(StatusCodes.NOT_FOUND, "Translation not found");
  }

  return prisma.productTranslation.delete({ where: { id } });
};

export const ProductTranslationService = {
  createProductTranslation,
  getTranslationsByProduct,
  getTranslationById,
  updateTranslation,
  deleteTranslation,
};
