import express from "express";
import { createUserHandler, listUsersHandler, getUserByIdHandler } from "../controllers/userController";

const router = express.Router();

// Route for: Create a user
router.post("/", createUserHandler);

// Route for: List users
router.get("/", listUsersHandler);

// Route for: Get a user by ID and their borrow history
router.get("/:id", getUserByIdHandler);

export default router;

