import Joi from "joi";

export const ValidationMiddleware = (schema) => {
  return (req, res, next) => {
    try {

      const { error, value } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        next(error);
      }

      req.body = value; // Clean data
      next();
    } catch (error) {
      next(error);
    }
  };
};
