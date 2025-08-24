import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prisma";
import { ensureUserExists } from "../../utils/user/ensureUserExists ";

interface CreateProductMediaInput {
  productId: string;
  url: string;
  type?: string;
  alt?: string;
}

const createProductMedia = async (
  userId: string,
  data: CreateProductMediaInput
) => {
  console.log("🚀 ~ data:", data)
  const user = await ensureUserExists(userId);

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) throw new AppError(StatusCodes.NOT_FOUND, "Product not found");

  

  return prisma.productMedia.create({
    data: {
      ...data,
      userId,
    },
  });
};

// Get media by product
const getProductMediaByProduct = async (productId: string) => {
  return prisma.productMedia.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
  });
};

const deleteProductMedia = async (userId: string, id: string) => {
  const user = await ensureUserExists(userId);

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  const media = await prisma.productMedia.findUnique({ where: { id } });

  if (!media) throw new AppError(StatusCodes.NOT_FOUND, "Media not found");

  return prisma.productMedia.delete({
    where: { id },
  });
};


export const ProductMediaService = {
  createProductMedia,
  getProductMediaByProduct,
  deleteProductMedia,
};