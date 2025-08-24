import { Router } from "express";
import { ProductController } from "./product.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth(), ProductController.createProduct);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.put("/:id", auth(), ProductController.updateProduct);

router.delete("/:id", auth(), ProductController.deleteProduct);

export const productRoutes = router;
