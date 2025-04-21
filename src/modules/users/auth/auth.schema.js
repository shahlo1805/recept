import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
}).required();

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).required();
