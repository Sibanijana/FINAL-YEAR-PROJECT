import Routine from "../models/routine.model.js";

// Create a new routine
export const createRoutine = async (req, res) => {
  try {
    const routineData = req.body;

    // Retrieve the active semester type (can be stored in config, query, or database)
    const activeSemesterType = req.query.activeSemester || "even"; // Default to 'even'
    const isSemesterEven = routineData.semester % 2 === 0;

    // Validation for active semester rules
    if (
      (activeSemesterType === "even" && !isSemesterEven) ||
      (activeSemesterType === "odd" && isSemesterEven)
    ) {
      return res.status(400).json({
        message: `Invalid semester: Only ${activeSemesterType} semesters are active.`,
      });
    }

    // Save the routine
    const newRoutine = new Routine({
      ...routineData,
      createdBy: req.user.id, // User ID from JWT middleware
    });
    await newRoutine.save();

    res
      .status(201)
      .json({ message: "Routine created successfully", data: newRoutine });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating routine", error: err.message });
  }
};

// Get all routines (with optional filters)
export const getRoutines = async (req, res) => {
  try {
    const filters = {};
    const { department, semester } = req.query;

    if (department) filters.department = department;
    if (semester) filters.semester = parseInt(semester);

    const routines = await Routine.find(filters).populate(
      "createdBy",
      "username role"
    );
    res.status(200).json({ data: routines });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching routines", error: err.message });
  }
};

// Update a routine
export const updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routineData = req.body;

    // Update the routine
    const updatedRoutine = await Routine.findByIdAndUpdate(
      id,
      { ...routineData, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res
      .status(200)
      .json({ message: "Routine updated successfully", data: updatedRoutine });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating routine", error: err.message });
  }
};

// Delete a routine
export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoutine = await Routine.findByIdAndDelete(id);

    if (!deletedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting routine", error: err.message });
  }
};
