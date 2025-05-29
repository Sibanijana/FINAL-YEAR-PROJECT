// User Model

import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    collegeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^281\d{8}$/,
        "Please enter a valid college ID (11 digits starting with 281)",
      ],
    },
    mobileNo: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid mobile number"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    departmentId: {
      type: String,
      enum: ["cse", "ece", "ee", "me", "ce", "csbs"],
      required: true,
    },
    group: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required() {
        return this.role === "Student";
      },
    },
    semester: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
      required() {
        return this.role === "Student";
      },
      required: true,
    },
    role: {
      type: String,
      enum: ["MasterAdmin", "HOD", "AssistantTeacher", "Student"],
      required: true,
    },
    department: {
      type: String,
      enum: ["CSE", "ECE", "EE", "ME", "CE", "CSBS"],
      required() {
        return this.role !== "MasterAdmin";
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
