import { Router } from "express";
import { OfferBannerController } from "./offerBanner.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  bannerIdSchema,
  createOfferBannerSchema,
  updateOfferBannerSchema,
} from "./offerBanner.schema";
import auth from "../../middlewares/auth";
import upload from "../../utils/cloudinary/multer";
import { uploadAndParse } from "../../utils/cloudinary/uploadAndParse";

const router = Router();

router.post(
  "/",
  //   auth("ADMIN"),
  auth(),
  upload.single("file"),
  uploadAndParse("OfferBanners", "imageUrl"),
  OfferBannerController.createOfferBanner
);

// ADMIN
router.get("/admin", auth("ADMIN"), OfferBannerController.getAllOfferBanners);

router.get("/", OfferBannerController.getAllActiveOfferBanners);

router.get(
  "/:bannerId",
  validateRequest(bannerIdSchema),
  OfferBannerController.getOfferBannerById
);

router.put(
  "/:bannerId",
  auth(),
  upload.single("file"),
  uploadAndParse("OfferBanners", "imageUrl"), // 👈 here
  OfferBannerController.updateOfferBanner
);

router.delete(
  "/:bannerId/soft",
  auth(),
  validateRequest(bannerIdSchema),
  OfferBannerController.softDeleteOfferBanner
);

router.patch(
  "/:bannerId/restore",
  auth(),
  validateRequest(bannerIdSchema),
  OfferBannerController.restoreOfferBanner
);

router.delete(
  "/:bannerId/hard",
  validateRequest(bannerIdSchema),
  OfferBannerController.hardDeleteOfferBanner
);

export const offerBannerRoutes = router;
