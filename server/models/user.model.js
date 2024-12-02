// User Model

import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["MasterAdmin", "HOD", "AssistantTeacher"],
      required: true,
    },
    department: {
      type: String,
      enum: ["CSE", "ECE", "EE", "ME", "CE", "CSBS"],
      required() {
        return this.role !== "MasterAdmin";
      },
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
