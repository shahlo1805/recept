import { join } from "node:path";
import multer from "multer";
import { BaseException } from "../exception/base.exception.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + `-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "images") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new BaseException(
          "Fayl turi noto'g'ri: images faqat rasm bo'lishi kerak",
          400
        )
      );
    }
  }

  if (file.fieldname === "videos") {
    if (!file.mimetype.startsWith("video/")) {
      return cb(
        new BaseException(
          "Fayl turi noto'g'ri: videos faqat video bo'lishi kerak",
          400
        )
      );
    }
  }

  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
