import Joi from "joi";

export const createBookSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Book name must be a string",
    "any.required": "Book name is required",
  }),
});