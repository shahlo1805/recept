import { Router } from "express";
import userController from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { rolesMiddleware } from "../../middleware/roles.middleware.js";
import { upload } from "../../config/multer.config.js";
import { updateProfileSchema } from "./user.schema.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";

const userRoutes = Router();
userRoutes
  .get(
    "/",
    authMiddleware,
    rolesMiddleware("admin", "super_admin"),
    userController.getAllUsers
  )
  .put(
    "/profile",
    authMiddleware,
    upload.single("avatar"),
    ValidationMiddleware(updateProfileSchema),
    userController.updateProfile
  );

export default userRoutes;
