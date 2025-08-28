import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { StatusCodes } from "http-status-codes";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const review = await ReviewService.createReview(userId, req.body);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Review created successfully",
    data: review,
  });
});

const getReviewsByProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { page, limit } = req.query;

  const result = await ReviewService.getReviewsByProduct(productId, Number(page) || 1, Number(limit) || 10);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const { id } = req.params;

  const review = await ReviewService.updateReview(userId, id, req.body);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review updated successfully",
    data: review,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const { id } = req.params;

  await ReviewService.deleteReview(userId, id);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: "Review deleted successfully",
    data: null,
  });
});

export const ReviewController = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};
