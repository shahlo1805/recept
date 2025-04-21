import Joi from "joi";

export const updateProfileSchema = Joi.object({
  bio: Joi.string(),
  name: Joi.string().required(),
}).required();
