// src/modules/users/user.route.ts
import { Router } from "express";

const router = Router();

// Public routes
router.get("/", async (req, res) => {
  // Json response
  res.json({
    message: "Hello World!",
  });
});

export const userRoutes = router;
