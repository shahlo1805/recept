import express from "express";
import router from "./route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// app.use("*", (_,res, __) => {
//     console.log("Bunday endepoint mavjud emas");
// });

export default app;
