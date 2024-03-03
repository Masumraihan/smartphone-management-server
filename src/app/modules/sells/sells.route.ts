import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SellsValidations } from "./sells.validation";
import { SellsController } from "./sells.controller";
import { userRole } from "../auth/auth.constant";
const router = express.Router();

router.post(
  "/create-sales",
  auth(userRole.superAdmin, userRole.manager),
  validateRequest(SellsValidations.createSellsValidationSchema),
  SellsController.createSells,
);
router.get(
  "/get-sales-history/:filterBy",
  auth(userRole.superAdmin, userRole.seller),
  SellsController.getSalesHistory,
);

export const SellsRoutes = router;
