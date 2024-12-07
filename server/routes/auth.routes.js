import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { requireRole } from "../middlewares/role.middlewares.js";

const router = Router();

// Routes
router.post("/register", verifyToken, requireRole("MasterAdmin"), registerUser); // Protected route
router.post("/login", loginUser); // Public route

export default router;
