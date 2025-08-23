import { Router } from "express";
import { AddressController } from "./address.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { addressSchema, updateAddressSchema } from "./address.schema";
const router = Router();

// Apply authentication middleware
router.use(auth());

// Routes
router.post(
  "/",
  validateRequest(addressSchema),
  AddressController.createAddress
);

router.get("/", AddressController.getAll);

router.put(
  "/:id",
  validateRequest(updateAddressSchema),
  AddressController.update
);

router.delete("/:id", AddressController.deleteAddress);

export const addressRoutes = router;
