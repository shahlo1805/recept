import { join } from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + `-${file.originalname}`);
  },
});

export const upload = multer({ storage });
