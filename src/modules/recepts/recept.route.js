import { Router } from "express";
import receptController from "./recept.controller.js";
import { upload } from "../../config/multer.config.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { createReseptSchema, updateReceptSchema } from "./resept.schema.js";

const receptRouter = Router();

receptRouter
  .get("/", receptController.getAllRecept)
  .get("/mine", authMiddleware, receptController.getMyRecepts)
  .get("/:id", receptController.getOneRecept)
  .post(
    "/",
    authMiddleware,
    upload.fields([
      { name: "images", maxCount: 5 },
      { name: "videos", maxCount: 2 },
    ]),
    ValidationMiddleware(createReseptSchema),
    receptController.createRecept
  )
  .put(
    "/:id",
    authMiddleware,
    ValidationMiddleware(updateReceptSchema),
    receptController.updateRecept
  )
  .delete("/:id", authMiddleware, receptController.deleteRecept);

export default receptRouter;
