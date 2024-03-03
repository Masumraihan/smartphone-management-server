import express from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ProductValidations } from "./product.validation";
import { userRole } from "../auth/auth.constant";
const router = express.Router();

router.post(
  "/create-product",
  auth(userRole.superAdmin, userRole.manager),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);
router.get(
  "/",
  auth(userRole.superAdmin, userRole.manager, userRole.seller),
  ProductControllers.getAllProduct,
);
router.get(
  "/:id",
  auth(userRole.superAdmin, userRole.manager, userRole.seller),
  ProductControllers.getSingleProduct,
);
router.put(
  "/update-product/:id",
  auth(userRole.superAdmin, userRole.manager),
  ProductControllers.updateProduct,
);
router.delete(
  "/delete-products",
  auth(userRole.superAdmin),
  validateRequest(ProductValidations.deleteProductsValidationSchema),
  ProductControllers.deleteProducts,
);

export const ProductRoutes = router;
