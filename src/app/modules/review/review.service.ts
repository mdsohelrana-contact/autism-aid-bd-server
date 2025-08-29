import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { checkExistsProductRelation } from "../../utils/product/checkExistsProductRelate";
import { OrderStatus } from "@prisma/client";

const createReview = async (
  userId: string,
  data: {
    productId: string;
    rating: number;
    comment?: string;
  }
) => {
  // Check if product exists
  await checkExistsProductRelation("product", data.productId);

  //  Check if user purchased this product
  const purchased = await prisma.orderItem.findFirst({
    where: {
      productId: data.productId,
      order: {
        userId,
        status: OrderStatus.DELIVERED,
      },
    },
  });

  if (!purchased) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You can only review products you have purchased"
    );
  }

  // Prevent duplicate review
  const existing = await prisma.review.findUnique({
    where: { productId_userId: { productId: data.productId, userId } },
  });
  if (existing)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You have already reviewed this product"
    );

  return prisma.$transaction(async (tx) => {
    // Create review
    const review = await tx.review.create({
      data: {
        userId,
        productId: data.productId,
        rating: data.rating,
        comment: data.comment,
      },
    });

    // Update product average rating
    const product = await tx.product.findUnique({
      where: { id: data.productId },
      select: { averageRating: true, reviewCount: true },
    });

    if (product) {
      const newCount = product.reviewCount + 1;
      const newAvg =
        (product.averageRating * product.reviewCount + data.rating) / newCount;

      await tx.product.update({
        where: { id: data.productId },
        data: {
          averageRating: newAvg,
          reviewCount: newCount,
        },
      });
    }

    return review;
  });
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
  return prisma.$transaction(async (tx) => {
    const review = await tx.review.findUnique({ where: { id: reviewId } });
    if (!review || review.userId !== userId)
      throw new AppError(StatusCodes.NOT_FOUND, "Review not found");

    const updatedReview = await tx.review.update({
      where: { id: reviewId },
      data,
    });

    if (data.rating !== undefined && data.rating !== review.rating) {
      const product = await tx.product.findUnique({
        where: { id: review.productId },
        select: { averageRating: true, reviewCount: true },
      });

      if (product) {
        const totalRating =
          product.averageRating * product.reviewCount -
          review.rating +
          data.rating;

        const newAvg = totalRating / product.reviewCount;

        await tx.product.update({
          where: { id: review.productId },
          data: { averageRating: newAvg },
        });
      }
    }

    return updatedReview;
  });
};

const deleteReview = async (userId: string, reviewId: string) => {
  return prisma.$transaction(async (tx) => {
    const review = await tx.review.findUnique({ where: { id: reviewId, isDeleted: false } });
    if (!review || review.userId !== userId)
      throw new AppError(StatusCodes.NOT_FOUND, "Review not found");

    // Soft delete
    const deleted = await tx.review.update({
      where: { id: reviewId },
      data: { isDeleted: true },
    });

    // Update product average rating
    const product = await tx.product.findUnique({
      where: { id: review.productId },
      select: { averageRating: true, reviewCount: true },
    });

    if (product) {
      const newCount = product.reviewCount - 1;
      let newAvg = 0;

      if (newCount > 0) {
        newAvg =
          (product.averageRating * product.reviewCount - review.rating) /
          newCount;
      }

      await tx.product.update({
        where: { id: review.productId },
        data: {
          averageRating: newAvg,
          reviewCount: newCount,
        },
      });
    }

    return deleted;
  });
};

export const ReviewService = {
  createReview,
  updateReview,
  deleteReview,
};
