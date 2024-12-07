import { AppDataSource } from "../config/database";
import { BookInfo } from "../models/BookInfo";
import { User } from "../models/User";
import { Book } from "../models/Book";
import { Not, IsNull } from "typeorm";  

export const borrowBook = async (userId: number, bookId: number) => {
  const bookInformationRepository = AppDataSource.getRepository(BookInfo);

  // If the book is already borrowed send message
  const bookInfo = await bookInformationRepository.findOneBy({ book: { id: bookId }, status: 2 });
  if (bookInfo) {
    throw new Error("Book is already borrowed by someone else");
  }

  // Update book info
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);

  const user = await userRepository.findOneBy({ id: userId });
  const book = await bookRepository.findOneBy({ id: bookId });

  if (!user || !book) {
    throw new Error("Invalid user or book ID");
  }

  const newBookInfo = new BookInfo();
  newBookInfo.oldUser = null;
  newBookInfo.currentUser = user;
  newBookInfo.book = book;
  newBookInfo.status = 2;

  await bookInformationRepository.save(newBookInfo);
  return { userId, bookId };
};

export const returnBook = async (userId: number, bookId: number, score: number) => {
  const bookInformationRepository = AppDataSource.getRepository(BookInfo);

  // Find the borrowed book info
  const bookInfo = await bookInformationRepository.findOne({
    where: { book: { id: bookId }, currentUser: { id: userId }, status: 2 },
  });

  if (!bookInfo) {
    throw new Error("Book not borrowed by the user");
  }

  // Update book info
  bookInfo.oldUser = await AppDataSource.getRepository(User).findOneBy({ id: userId }); 
  bookInfo.currentUser = null; 
  bookInfo.status = 1; 
  bookInfo.score = score;

  await bookInformationRepository.save(bookInfo);
  return { userId, bookId, score: bookInfo.score };
};



export const getAverageScore = async (bookId: number) => {
  const bookInformationRepository = AppDataSource.getRepository(BookInfo);
  const bookRepository = AppDataSource.getRepository(Book);

  // Fetch all book-related entries where score is not null using Not and IsNull
  const bookInfos = await bookInformationRepository.find({
    where: { book: { id: bookId }, score: Not(IsNull()) },
  });

  // Fetch book details for the name
  const book = await bookRepository.findOne({ where: { id: bookId } });

  if (!book) {
    throw new Error("Book not found");
  }

  if (bookInfos.length === 0) {
    return { id: book.id, name: book.name, score: -1 };
  }

  // Calculate the average score
  const totalScore = bookInfos.reduce((sum, bookInfo) => sum + bookInfo.score!, 0);
  const averageScore = totalScore / bookInfos.length;

  return { id: book.id, name: book.name, score: averageScore };
};


