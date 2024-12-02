//routine schema
import { Schema, model } from "mongoose";

const RoutineSchema = new Schema({
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
        required: true,
      },
      specificRoutine: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Routine", RoutineSchema);
