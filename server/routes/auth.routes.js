import { Router } from "express";
import {
  registerUser,
  loginUser,
  registerStudent,
  logoutUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { requireRole } from "../middlewares/role.middlewares.js";
import rateLimit from "express-rate-limit";

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many attempts, please try again later",
});

const router = Router();

// Routes
router.post(
  "/admin/register",
  verifyToken,
  requireRole("MasterAdmin"),
  registerUser
);

router.post(
  "/register/student",
  authLimiter, // Add rate limiting
  registerStudent
);

router.post(
  "/login",
  authLimiter, // Add rate limiting
  loginUser
);

router.post(
  "/logout",
  verifyToken, // Require valid token to logout
  logoutUser
);

export default router;
