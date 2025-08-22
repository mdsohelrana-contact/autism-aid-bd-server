import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserSchema } from "./user.schema";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserSchema),
  UserController.createUser
);

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export const userRoutes = router;
