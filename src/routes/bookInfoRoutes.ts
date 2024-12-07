import express from 'express';
import { borrowBookController, getAverageScoreController, returnBookController } from '../controllers/bookInfoController';

const router = express.Router();

// Route for: User borrows a book
router.post('/users/:userId/borrow/:bookId', borrowBookController);

// Route for: Return a book with a score
router.post('/users/:userId/return/:bookId', returnBookController);

// Route for: Get average score of a book by its ID
router.get('/books/:bookId', getAverageScoreController);

export default router;
