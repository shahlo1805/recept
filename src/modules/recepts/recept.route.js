import { Router } from "express";
import receptController from "./recept.controller.js";


const receptRouter = Router();

receptRouter
.get("/", receptController.getAllRecept)
.get("/:id", receptController.getOneRecept)
.post("/create", receptController.createRecept)
.put("/:id", receptController.updateRecept)
.delete("/:id", receptController.deleteRecept);

export default receptRouter;
