import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { OfferBannerService } from "./offerBanner.service";
import responseHandler from "../../utils/responseHandler";
import { parseQueryParams } from "../../utils/builder/parseQueryParams";

// Create offer banner
const createOfferBanner = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const data = req.body;

  const offerBanner = await OfferBannerService.createOfferBanner(userId, data);

  responseHandler({
    res,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Offer banner created successfully",
    data: offerBanner,
  });
});

// Get all offer banners for ADMIN
const getAllOfferBanners = catchAsync(async (req: Request, res: Response) => {
  const query = parseQueryParams(req);

  const offerBanners = await OfferBannerService.getAllOfferBanners(query);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer banners retrieved successfully",
    meta: offerBanners.meta,
    data: offerBanners.data,
  });
});

// Get all active offer banners
const getAllActiveOfferBanners = catchAsync(
  async (req: Request, res: Response) => {
    const query = parseQueryParams(req);
    const offerBanners = await OfferBannerService.getAllActiveOfferBanners(
      query
    );

    responseHandler({
      res,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Offer banners retrieved successfully",
      meta: offerBanners.meta,
      data: offerBanners.data,
    });
  }
);

// Get offer banner by ID
const getOfferBannerById = catchAsync(async (req: Request, res: Response) => {
  const { bannerId } = req.params;
  const offerBanner = await OfferBannerService.getOfferBannerById(bannerId);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer banner retrieved successfully",
    data: offerBanner,
  });
});

// Update offer banner
const updateOfferBanner = catchAsync(async (req: Request, res: Response) => {
  const userId = req!.user!.id;
  const { bannerId } = req.params;
  const data = req.body;

  const offerBanner = await OfferBannerService.updateOfferBanner(
    userId,
    bannerId,
    data
  );

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer banner updated successfully",
    data: offerBanner,
  });
});

// Soft delete offer banner
const softDeleteOfferBanner = catchAsync(
  async (req: Request, res: Response) => {
    const { bannerId } = req.params;
    const userId = req!.user!.id;

    await OfferBannerService.softDeleteOfferBanner(userId, bannerId);

    responseHandler({
      res,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Offer banner deleted successfully",
    });
  }
);

// Restore offer banner
const restoreOfferBanner = catchAsync(async (req: Request, res: Response) => {
  const { bannerId } = req.params;
  const userId = req!.user!.id;

  await OfferBannerService.restoreOfferBanner(userId, bannerId);

  responseHandler({
    res,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Offer banner restored successfully",
  });
});

// Hard delete offer banner
const hardDeleteOfferBanner = catchAsync(
  async (req: Request, res: Response) => {
    const { bannerId } = req.params;
    const userId = req!.user!.id;

    await OfferBannerService.hardDeleteOfferBanner(userId, bannerId);

    responseHandler({
      res,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Offer banner deleted successfully",
    });
  }
);

export const OfferBannerController = {
  createOfferBanner,
  getAllOfferBanners,
  getAllActiveOfferBanners,
  getOfferBannerById,
  updateOfferBanner,
  softDeleteOfferBanner,
  restoreOfferBanner,
  hardDeleteOfferBanner,
};
