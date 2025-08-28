import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";

const createReview = async (
  userId: string,
  data: {
    productId: string;
    rating: number;
    comment?: string;
  }
) => {
  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });
  if (!product) throw new AppError(StatusCodes.NOT_FOUND, "Product not found");

  // Prevent duplicate review
  const existing = await prisma.review.findUnique({
    where: { productId_userId: { productId: data.productId, userId } },
  });
  if (existing)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You have already reviewed this product"
    );

  return prisma.review.create({
    data: {
      userId,
      productId: data.productId,
      rating: data.rating,
      comment: data.comment,
    },
  });
};

const getReviewsByProduct = async (productId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const reviews = await prisma.review.findMany({
    where: { productId, isDeleted: false },
    include: { user: { select: { id: true, name: true } } },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.review.count({
    where: { productId, isDeleted: false },
  });

  return { reviews, total, page, limit };
};

const updateReview = async (
  userId: string,
  reviewId: string,
  data: {
    rating?: number;
    comment?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED";
  }
) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review || review.userId !== userId)
    throw new AppError(StatusCodes.NOT_FOUND, "Review not found");

  return prisma.review.update({
    where: { id: reviewId },
    data,
  });
};

const deleteReview = async (userId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review || review.userId !== userId)
    throw new AppError(StatusCodes.NOT_FOUND, "Review not found");

  // Soft delete
  return prisma.review.update({
    where: { id: reviewId },
    data: { isDeleted: true },
  });
};

export const ReviewService = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};
