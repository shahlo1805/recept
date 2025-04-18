import { Router } from "express";
import authrouter from "./modules/users/user.route.js";
import categoryRouter from "./modules/categories/category.route.js";
import receptRouter from "./modules/recepts/recept.route.js";

const router = Router();

router
.use("/auth", authrouter)
.use("/category", categoryRouter)
.use("/recepts",receptRouter );

export default router;
