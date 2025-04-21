import { config } from "dotenv";
import userModel from "../modules/users/user.model.js";
import bcrypt from "bcrypt";
config();

export const createSuperAdmin = async () => {
  const exists = await userModel.findOne({ role: "super_admin" });
  if (exists) return;

  const hashedPassword = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD || "admin123",
    10
  );
  await userModel.create({
    name: "Super Admin",
    email: process.env.SUPER_ADMIN_EMAIL || "admin@example.com",
    password: hashedPassword,
    role: "super_admin",
  });

  console.log("✅ Super admin yaratildi");
};
