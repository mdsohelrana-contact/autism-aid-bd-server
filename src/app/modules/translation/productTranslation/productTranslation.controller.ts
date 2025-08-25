import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ProductTranslationService } from "./productTranslation.service";
import responseHandler from "../../../utils/responseHandler";
import { StatusCodes } from "http-status-codes";

// Create translation
const createTranslation = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const data = req.body;
  const translation = await ProductTranslationService.createProductTranslation(
    userId,
    data
  );

  responseHandler({
    res,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Product translation created successfully",
    data: translation,
  });
});

// Get all translations for a product
const getTranslations = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const translations = await ProductTranslationService.getTranslationsByProduct(
    productId
  );

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product translations fetched successfully",
    data: translations,
  });
});

// Get single translation
const getTranslation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const translation = await ProductTranslationService.getTranslationById(id);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product translation fetched successfully",
    data: translation,
  });
});

// Update translation
const updateTranslation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const translation = await ProductTranslationService.updateTranslation(
    id,
    data
  );

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product translation updated successfully",
    data: translation,
  });
});

// Delete translation
const deleteTranslation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await ProductTranslationService.deleteTranslation(id);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product translation deleted successfully",
  });
});

export const ProductTranslationController = {
  createTranslation,
  getTranslations,
  getTranslation,
  updateTranslation,
  deleteTranslation,
};
