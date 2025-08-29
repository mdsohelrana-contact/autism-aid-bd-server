import { Router } from "express";
import auth from "../../middlewares/auth";
import { PaymentController } from "./payment.controller";
import { CartController } from "../cart/cart.controller";

const router = Router();

router.use(auth());

router.get("/", PaymentController.getAllPayments);

router.post("/item", PaymentController.createManualPayment);

router.put("/:paymentId", PaymentController.updatePaymentStatusById);

router.get("/:paymentId", PaymentController.getPaymentById);

export const paymentRoutes = router;
