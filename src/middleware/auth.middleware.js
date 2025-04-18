import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/jwt.config.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const decodedtoken = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (!decodedtoken) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    if (!decodedtoken.user_id) {
      return res.status(401).json({
        message: "Invalid user",
      });
    }

    req.role = decodedtoken.role;
    req.user_id = decodedtoken.user_id;

    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};
