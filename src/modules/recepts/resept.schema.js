import Joi from "joi";

export const createReseptSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  preparationPlan: Joi.string().required(),
  ingredients: Joi.string().required(),
  categoryId: Joi.string().required(),
}).required();

export const updateReceptSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  preparationPlan: Joi.string().required(),
  ingredients: Joi.string().required(),
  categoryId: Joi.string().required(),
});
