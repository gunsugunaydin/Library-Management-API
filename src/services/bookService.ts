import { AppDataSource } from "../config/database";
import { Book } from "../models/Book";

// Create a new book
export const createBook = async (name: string) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const newBook = bookRepository.create({ name });
  return await bookRepository.save(newBook);
};

// List books
export const listBooks = async () => {
  const bookRepository = AppDataSource.getRepository(Book);
  return await bookRepository.find();
};

