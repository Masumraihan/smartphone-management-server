import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
  updateUserValidationSchema,
} from "./auth.validation";
import auth from "../../middlewares/auth";
import { userRole } from "./auth.constant";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  AuthControllers.registerUser,
);
router.put(
  "/users/update-user/:userId",
  auth(userRole.superAdmin),
  validateRequest(updateUserValidationSchema),
  AuthControllers.updateUser,
);
router.get("/users", auth(userRole.superAdmin), AuthControllers.getAllUser);
router.post("/login", validateRequest(loginUserValidationSchema), AuthControllers.loginUser);
router.post("/refresh-token", AuthControllers.refreshToken);

export const AuthRoutes = router;
