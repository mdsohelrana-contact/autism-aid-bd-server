import { Router } from "express";
import upload from "../../utils/cloudinary/multer";
import auth from "../../middlewares/auth";
import { uploadAndParse } from "../../utils/cloudinary/uploadAndParse";
import { MediaController } from "./productMedia.controller";

const router = Router();

router.post(
  "/upload",
  auth(),
  upload.single("file"),
  uploadAndParse("products", "url"), // 👈 here
  MediaController.createMedia
);

router.get("/:productId", MediaController.getMediaByProduct);

router.delete("/:id", MediaController.deleteMedia);

export const productMediaRoutes = router;
