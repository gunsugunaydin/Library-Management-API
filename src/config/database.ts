import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Book } from "../models/Book";
import { BookInfo } from "../models/BookInfo";

// Database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "library_management",
  entities: [User, Book, BookInfo],
  synchronize: true, 
  logging: true,
});
