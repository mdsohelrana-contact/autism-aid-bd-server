import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createCouponSchema } from "./coupon.schema";
import { CouponController } from "./coupon.controller";

const router = Router();

router.use(auth())

router.post("/", validateRequest(createCouponSchema),CouponController.createCoupon);

router.get("/", CouponController.getCoupons);

router.get("/:id", CouponController.getCouponById);

router.put("/:id", CouponController.updateCoupon);

router.delete("/:id", CouponController.deleteCoupon);

export const couponRoutes = router;
