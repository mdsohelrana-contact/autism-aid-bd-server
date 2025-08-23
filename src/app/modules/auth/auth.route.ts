import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { loginSchema, refreshSchema } from "./auth.schema";

const router = Router();

router.post(
  "/login",
  validateRequest(loginSchema),
  AuthController.loginHandler
);
router.post(
  "/refresh-token",
  validateRequest(refreshSchema),
  AuthController.refreshTokenHandler
);
router.post("/logout", AuthController.logoutHandler);

// Protected route example
router.get("/me", auth(), AuthController.me);

export const authRoutes = router;
