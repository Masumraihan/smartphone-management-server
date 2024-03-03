import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SellsValidations } from "./sells.validation";
import { SellsController } from "./sells.controller";
const router = express.Router();

router.post(
  "/create-sales",
  auth(),
  validateRequest(SellsValidations.createSellsValidationSchema),
  SellsController.createSells,
);
router.get("/get-sales-history/:filterBy", auth(), SellsController.getSalesHistory);

export const SellsRoutes = router;
