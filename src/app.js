import express from "express";
import router from "./route.js";
// import methodOverride from "method-override";
import path from "node:path"
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware.js";

const app = express();

// app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", router);

app.use(ErrorHandlerMiddleware);

export default app;
