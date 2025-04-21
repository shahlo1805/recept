import userModel from "../user.model.js";
import { compare, hash } from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET,
} from "../../../config/jwt.config.js";
import { sendMail } from "../../../utils/mail.utils.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const foundedUser = await userModel.findOne({ email });

    if (foundedUser) {
      return res.status(422).json({
        message: "Bunday email ga ega foydalanuvchi allaqqachon mavjud",
      });
    }

    const hashedPassword = await hash(password, 10);

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await userModel.findOne({ email });

    if (!foundedUser) {
      return res.status(404).json({
        message: "Bunday email ga ega foydalanuvchi yoq, emailni tekshiring",
      });
    }

    const isMatch = await compare(password, foundedUser.password);

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid password",
      });
    }

    const accessToken = jwt.sign(
      {
        user_id: foundedUser.id,
        role: foundedUser.role,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        algorithm: "HS256",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: foundedUser.id,
        role: foundedUser.role,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        algorithm: "HS256",
      }
    );

    res.status(200).json({
      message: "Tizimga muvaffaqiyatli kirildi",
      tokens: {
        accessToken,
        refreshToken,
      },
      users: {
        id: foundedUser.id,
        name: foundedUser.name,
        email: foundedUser.email,
        role: foundedUser.role,
      },
    });
  } catch (error) {
    next(error), console.log(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const fron_app_base_url = "http://localhost:3001";

    const token = crypto.randomBytes(50);
    user.token = token.toString("hex");

    await user.save();

    await sendMail({
      to: email,
      subject: "Reset password",
      html: `
          <h2>Quyidagi link orqali yangilang</h2>
          <a href="${fron_app_base_url}/auth/reset-password?token=${user.token}">Link</a>
          `,
    });

    console.log(`token: ${token}`);

    res.status().json({
      message:
        "Elektron pochtangizga, parolni tiklash bo'yicha yo'riqnoma yuborildi!",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.query;
    console.log(password, token);

    if (!token) {
      return res.status(403).json({
        message: "Token not found",
      });
    }

    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordHash = await hash(password, 10);

    user.password = passwordHash;

    await user.save();

    res.status(200).json({
      message: "Password yangilandi",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
};
