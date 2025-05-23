import Joi from "joi";
import fs from "fs";

export const ErrorHandlerMiddleware = (err, req, res, __) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Faylni o'chirishda xato:", err);
    });
  }


  if (err instanceof Joi.ValidationError) {
    return res.status(400).send({ message: err.message });
  }


  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }


  if (err.name === "BaseException") {
    return res.status(err.status).json({ message: err.message });
  }


  console.error(err);
  res.status(500).send({ message: "Internal Server Error", err: err.message });
};

export default ErrorHandlerMiddleware;
