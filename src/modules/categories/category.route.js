import { Router } from "express";
import categoryController from "./category.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { rolesMiddleware } from "../../middleware/roles.middleware.js";
import {ValidationMiddleware} from "../../middleware/validation.middleware.js"
import { createCategorySchema, updateCategorySchema } from "./category.schema.js";

const categoryRouter = Router();

categoryRouter
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getOneCategory)
  .post("/create",authMiddleware, 
    rolesMiddleware("super_admin", "admin"),
    ValidationMiddleware(createCategorySchema) , 
    categoryController.createCategory)
  .put("/update",
     authMiddleware,
      rolesMiddleware("admin", "super_admin"),
       ValidationMiddleware(updateCategorySchema),
   categoryController.updateCategory)
  .delete("/:id", authMiddleware, rolesMiddleware("admin"),
  categoryController.deleteCategory);

export default categoryRouter;
