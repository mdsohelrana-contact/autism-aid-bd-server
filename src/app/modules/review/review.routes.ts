import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth(), ReviewController.createReview);
router.get("/product/:productId", ReviewController.getReviewsByProduct);
router.put("/:id", auth(), ReviewController.updateReview);
router.delete("/:id", auth(), ReviewController.deleteReview);

export const reviewRoutes = router;
