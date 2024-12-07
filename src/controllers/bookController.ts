import { Request, Response, NextFunction } from "express";
import { createBook, listBooks } from "../services/bookService";

// Create a new book
export const createBookHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Book name is required" });
      return; 
    }

    const book = await createBook(name);
    res.status(201).json({ message: "Book created successfully", data: book });
  } catch (error) {
    next(error);
  }
};

// List books
export const listBooksHandler = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const books = await listBooks();
    res.status(200).json({ data: books });
  } catch (error) {
    next(error);
  }
};




