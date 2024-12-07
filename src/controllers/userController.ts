import { Request, Response, NextFunction } from "express";
import { createUser, listUsers, getUserById } from "../services/userService";

// Create a user
export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "User name is required" });
      return;
    }

    const user = await createUser(name);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    next(error);
  }
};

// List users
export const listUsersHandler = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await listUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

// Get a user by ID and their borrow history
export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const userId = Number(id);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid User ID" });
      return;
    }

    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: `User with ID ${id} not found` });
      return;
    }

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

