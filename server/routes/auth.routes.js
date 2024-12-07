import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middlewares.js";

const router = Router();

// Routes
router.post("/register", verifyToken, registerUser); // Protected route
router.post("/login", loginUser); // Public route

export default router;
