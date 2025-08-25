import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth(), CategoryController.createCategory);

router.get("/", CategoryController.getAllCategories);

router.get("/:id", CategoryController.getCategoryById);

router.put("/:id", auth(), CategoryController.updateCategory);

router.delete("/:id", auth(), CategoryController.deleteCategory);

export const categoryRoutes = router;
