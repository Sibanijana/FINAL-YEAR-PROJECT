import express from "express";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routine.controller.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import roleMiddleware from "../middlewares/role.middlewares.js";

const router = express.Router();

// Routes
router.post("/", authMiddleware, roleMiddleware("MasterAdmin"), createRoutine); // Create routine
router.get("/", authMiddleware, getRoutines); // Get routines (optional filters)
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["MasterAdmin", "HOD"]),
  updateRoutine
); // Update routine
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("MasterAdmin"),
  deleteRoutine
); // Delete routine

export default router;
