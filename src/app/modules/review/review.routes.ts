import { createReviewSchema, updateReviewSchema } from "./review.schema";
import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.use(auth());

router.post(
  "/",
  validateRequest(createReviewSchema),
  ReviewController.createReview
);



router.put(
  "/:id",
  validateRequest(updateReviewSchema),
  ReviewController.updateReview
);

router.delete("/:id", ReviewController.deleteReview);

export const reviewRoutes = router;
