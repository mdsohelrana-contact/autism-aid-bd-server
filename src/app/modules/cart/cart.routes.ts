import { Router } from "express";
import auth from "../../middlewares/auth";
import { CartController } from "./cart.controller";


const router = Router();

router.use(auth()); 

router.get("/", CartController.getCart);
router.post("/item", CartController.addToCart);
router.put("/item", CartController.updateCartItem);
router.delete("/item", CartController.removeCartItem);

export const cartRoutes = router;
