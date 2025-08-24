import { Router } from "express";
import { ProductTranslationController } from "./productTranslation.controller";
import auth from "../../middlewares/auth";


const router = Router();

// Create translation
router.post("/", auth(), ProductTranslationController.createTranslation);

// Get all translations for a product
router.get("/product/:productId", ProductTranslationController.getTranslations);

// Get single translation
router.get("/:id", ProductTranslationController.getTranslation);

// Update translation
router.put("/:id", ProductTranslationController.updateTranslation);

// Delete translation
router.delete("/:id", ProductTranslationController.deleteTranslation);


export const productTranslationRoutes = router;
