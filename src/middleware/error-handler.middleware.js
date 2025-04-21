import Joi from "joi";
import fs from "fs";

export const ErrorHandlerMiddleware = (err, req, res, __) => {
  // Agar requestda file bo'lsa, fileni o'chirib yuborish kerak
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Faylni o'chirishda xato:", err);
    });
  }

  // 1. Joi validation error
  if (err instanceof Joi.ValidationError) {
    return res.status(400).send({ message: err.message });
  }

  // 2. Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }

  // 3. O'zing yaratgan BaseException
  if (err.name === "BaseException") {
    return res.status(err.status).json({ message: err.message });
  }

  // Default case
  console.error(err);
  res.status(500).send({ message: "Internal Server Error", err: err.message });
};

export default ErrorHandlerMiddleware;
