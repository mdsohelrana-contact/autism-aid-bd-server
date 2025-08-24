import { Router } from "express";
import * as ProductMediaController from "./productMedia.controller";
import upload from "../../utils/cloudinary/multer";
import auth from "../../middlewares/auth";
import { uploadAndParse } from "../../utils/cloudinary/uploadAndParse";

const router = Router();

router.post(
  "/upload",
  auth(),
  upload.single("file"),
  uploadAndParse("products", "url"), // 👈 here
  ProductMediaController.createMedia
);

router.get("/:productId", ProductMediaController.getMediaByProduct);

router.delete("/:id", ProductMediaController.deleteMedia);

export const productMediaRoutes = router;
