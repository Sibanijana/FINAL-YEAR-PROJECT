import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import routineRoutes from "./routes/routines.routes.js";
import errorHandler from "./middlewares/error.handler.middlewares.js";
import pkg from "bcryptjs";
//const { hash } = pkg;

// Import routes
// import userRoutes from "./routes/userRoutes";
// import routineRoutes from "./routes/routineRoutes";

// Load environment variables
config();

const app = express();

// Middleware
app.use(json()); // Parses incoming JSON requests
app.use(cors()); // Enables cross-origin requests

// MongoDB connection
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
// app.use("/api/users", userRoutes); // User authentication and management routes
// app.use("/api/routine", routineRoutes); // Routine management routes
app.use("/api/auth", authRoutes);
app.use("/api/routine", routineRoutes);
app.use(errorHandler);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the College Routine Management System API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
