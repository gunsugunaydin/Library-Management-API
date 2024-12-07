import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes";
import bookRoutes from "./src/routes/bookRoutes";
import bookInfoRoutes from "./src/routes/bookInfoRoutes";
import { AppDataSource } from "./src/config/database";

// Initialize database
const initialize = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Error during database initialization: ", error);
  }
};

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());


// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use(bookInfoRoutes);


// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: error.message });
});


// Server
const PORT = 3000;
initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`✨ Server is running on http://localhost:${PORT} ✨`);
  });
});