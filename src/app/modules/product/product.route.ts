import express from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ProductValidations } from "./product.validation";
const router = express.Router();

router.post(
  "/create-product",
  auth(),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);
router.get("/", auth(), ProductControllers.getAllProduct);
router.get("/:id", auth(), ProductControllers.getSingleProduct);
router.put("/update-product/:id", ProductControllers.updateProduct);
router.delete(
  "/delete-products",
  auth(),
  validateRequest(ProductValidations.deleteProductsValidationSchema),
  ProductControllers.deleteProducts,
);

export const ProductRoutes = router;
