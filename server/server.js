import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import xss from "xss";
import hpp from "hpp";
import authRoutes from "./routes/auth.routes.js";
import routineRoutes from "./routes/routines.routes.js";
import errorHandler from "./middlewares/error.handler.middlewares.js";

//const { hash } = pkg;

// Import routes
// import userRoutes from "./routes/userRoutes";
// import routineRoutes from "./routes/routineRoutes";

// Load environment variables
config();

const app = express();
const xssFilter = new xss.FilterXSS({
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script"],
});
// Middleware
app.use(json()); // Parses incoming JSON requests
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || true,
    credentials: true,
  })
); /// Enables cross-origin requests

// Prevent XSS attacks
app.use((req, res, next) => {
  // Sanitize request body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = xssFilter.process(req.body[key]);
      }
    });
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === "string") {
        req.query[key] = xssFilter.process(req.query[key]);
      }
    });
  }

  // Sanitize route parameters
  if (req.params) {
    Object.keys(req.params).forEach((key) => {
      if (typeof req.params[key] === "string") {
        req.params[key] = xssFilter.process(req.params[key]);
      }
    });
  }

  next();
});

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  })
);

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
