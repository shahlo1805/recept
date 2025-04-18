import { Router } from "express";
import categoryController from "./category.controller.js";

const categoryRouter = Router();

categoryRouter
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getOneCategory)
  .post("/create", categoryController.createCategory)
  .put("/update", categoryController.updateCategory)
  .delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
