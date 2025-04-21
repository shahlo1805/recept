import { Router } from "express";
import authController from "./auth.controller.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.schema.js";

const authRoutes = Router();
authRoutes
  .post(
    "/register",
    ValidationMiddleware(registerSchema),
    authController.register
  )
  .post("/login", ValidationMiddleware(loginSchema), authController.login)
  .post(
    "/forgot-password",
    ValidationMiddleware(forgotPasswordSchema),
    authController.forgotPassword
  )
  .post("/reset-password", authController.resetPassword);

export default authRoutes;
