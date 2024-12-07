import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name must not exceed 100 characters",
    "any.required": "Name is required",
  }),
});