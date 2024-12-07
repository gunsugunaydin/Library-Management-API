import { Request, Response, RequestHandler } from "express";
import { borrowBook, getAverageScore, returnBook } from "../services/bookInfoService";

// User borrows a book
export const borrowBookController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    if (!userId || !bookId) {
      res.status(400).json({ error: "userId and bookId are required" });
      return;
    }

    const result = await borrowBook(userId, bookId);
    res.status(200).json({ message: "User borrowed a book successfully", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Return a book with a score
export const returnBookController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId); 
    const { score } = req.body; 

    if (!userId || !bookId || score === undefined) {
      res.status(400).json({ error: "userId, bookId, and score are required" });
      return;
    }

    const result = await returnBook(userId, bookId, score !== undefined ? score : -1);
    res.status(200).json({ message: "Returning a book with its score", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get average score of a book by its ID
export const getAverageScoreController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = parseInt(req.params.bookId);

    if (!bookId) {
      res.status(400).json({ error: "bookId is required" });
      return;
    }

    const result = await getAverageScore(bookId);

    res.status(200).json({
      message: "Average score fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};







