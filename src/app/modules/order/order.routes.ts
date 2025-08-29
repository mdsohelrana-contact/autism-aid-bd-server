import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createOrderSchema } from "./order.schema";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.use(auth());

router.post(
  "/",
  validateRequest(createOrderSchema),
  OrderController.createOrder
);

router.get("/", OrderController.getAllOrders);

router.patch("/:orderId", OrderController.updateOrderStatus);

router.delete("/:orderId", OrderController.cancelOrder);

export const orderRoutes = router;
