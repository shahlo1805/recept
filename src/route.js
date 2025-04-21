import { Router } from "express";
import categoryRouter from "./modules/categories/category.route.js";
import receptRouter from "./modules/recepts/recept.route.js";
import authRoutes from "./modules/users/auth/auth.route.js";
import userRoutes from "./modules/users/user.route.js";

const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/category", categoryRouter)
  .use("/recepts", receptRouter);

export default router;
