import mongoose, { Schema, model } from "mongoose";

const RoutineSchema = new Schema(
  {
    subjectCode: {
      type: String,
      required: true,
      trim: true,
    },
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    subjectType: {
      type: String,
      enum: ["Theory", "Lab"],
      required: true,
    },
    numberOfClasses: {
      type: Number,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
      trim: true,
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      enum: ["CSE", "ECE", "EE", "ME", "CE", "CSBS"],
      required: true,
    },
    semester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
    },
    assignedTeachers: [
      {
        teacherName: {
          type: String,
          required: [true, "Teacher name is required"],
        },
        specificRoutine: {
          type: String,
          required: [true, "Specific routine is required"],
          trim: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Index for faster queries by department and semester
RoutineSchema.index({ department: 1, semester: 1 });

export default model("Routine", RoutineSchema);
