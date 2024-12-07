import Joi from "joi";

export const borrowBookSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
  bookId: Joi.number().integer().required().messages({
    "number.base": "Book ID must be a number",
    "any.required": "Book ID is required",
  }),
});