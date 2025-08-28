import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { StatusCodes } from "http-status-codes";
import { ProductMediaService } from "./productMedia.service";

// Create media
 const createMedia = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;

  const media = await ProductMediaService.createProductMedia(userId, req.body);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Media uploaded successfully",
    data: media,
  });
});

// Get media by product
 const getMediaByProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const media = await ProductMediaService.getProductMediaByProduct(productId);

    responseHandler({
      res,
      req,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Product media fetched successfully",
      data: media,
    });
  }
);

// Delete media
 const deleteMedia = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const { id } = req.params;
  await ProductMediaService.deleteProductMedia(userId, id);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Media deleted successfully",
    data: null,
  });
});

export const MediaController = {
  createMedia,
  getMediaByProduct,
  deleteMedia,
};
