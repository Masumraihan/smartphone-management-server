import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginUserValidationSchema, registerUserValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  AuthControllers.registerUser,
);
router.post("/login", validateRequest(loginUserValidationSchema), AuthControllers.loginUser);
router.post("/refresh-token", AuthControllers.refreshToken);

export const AuthRoutes = router;
