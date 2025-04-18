import { Router } from "express";
import userController from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { rolesMiddleware } from "../../middleware/roles.middleware.js";
import { upload } from "../../config/multer.config.js";

const authrouter = Router();
authrouter
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/forgot-password", authMiddleware, userController.forgotPassword)
  .post("/reset-password", authMiddleware, userController.resetPassword)
  .get(
    "/users",
    authMiddleware,
    rolesMiddleware("admin"),
    userController.getAllUsers
  )
  .put(
    "/profile",
    authMiddleware,
    upload.single("profile"),
    userController.updateProfile
  );

export default authrouter;
