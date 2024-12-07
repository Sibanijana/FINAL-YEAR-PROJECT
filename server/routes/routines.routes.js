import express from "express";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routine.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { roleMiddleware } from "../middlewares/role.middlewares.js";

const router = express.Router();

// Routes
router.post(
  "/create-routines",
  verifyToken,
  roleMiddleware(["MasterAdmin", "HOD"]),
  createRoutine
); // Create routine
router.get("/get-routines", verifyToken, getRoutines); // Get routines (optional filters)
router.patch(
  "/:id",
  verifyToken,
  roleMiddleware(["MasterAdmin", "HOD"]),
  updateRoutine
); // Update routine
router.delete(
  "/:id",
  verifyToken,
  roleMiddleware("MasterAdmin"),
  deleteRoutine
); // Delete routine

export default router;
