import express from "express";
import { validate } from "../middleware/validationMiddleware";
import { createBookSchema } from "../validators/bookValidator";
import { createBookHandler, listBooksHandler } from "../controllers/bookController";

const router = express.Router();

// Route for: Create a new book
router.post("/", validate(createBookSchema), createBookHandler); 

// Route for: List books
router.get("/", listBooksHandler); 

export default router;
