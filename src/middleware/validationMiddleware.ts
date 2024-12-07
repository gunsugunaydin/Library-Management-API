import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { AppError } from "../utils/errorHandler";

// Middleware to validate request body against a Joi schema, handle validation errors
export function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      next(new AppError(errorMessage, 400));
    } else {
      next();
    }
  };
}