import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ProductRoutes } from "../modules/product/product.route";
import { SellsRoutes } from "../modules/sells/sells.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/sales",
    route: SellsRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));
export default router;
