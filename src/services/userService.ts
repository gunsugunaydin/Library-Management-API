import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { BookInfo } from "../models/BookInfo";

// Create a new user
export const createUser = async (name: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create({ name });
  return await userRepository.save(newUser);
};

// List users
export const listUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
};

// Get user by ID with borrow history (past and present books)
export const getUserById = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  
  // Fetch the user with their related books 
  const user = await userRepository.findOne({
    where: { id },
    relations: ["pastBooks", "presentBooks", "pastBooks.book", "presentBooks.book"], 
  });

  if (!user) {
    throw new Error("User not found");
  }

  const formattedResponse = {
    id: user.id,
    name: user.name,
    books: {
      past: user.pastBooks
        .filter((bookInfo) => bookInfo.status === 1) // Only returned(=status 1) books 
        .map((bookInfo) => ({
          name: bookInfo.book ? bookInfo.book.name : "Unknown Book", // Ensure book exists
          userScore: bookInfo.score ?? -1, // Default score to -1 if not available
        })),
      present: user.presentBooks
        .filter((bookInfo) => bookInfo.status === 2) 
        .map((bookInfo) => ({
          name: bookInfo.book ? bookInfo.book.name : "Unknown Book", 
        })),
    },
  };

  return formattedResponse;
};