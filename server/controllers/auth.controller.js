import User from "../models/user.model.js";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

// Register a new user
export async function registerUser(req, res) {
  try {
    const { username, password, role, department } = req.body;

    // Only MasterAdmin can register users
    if (req.user.role !== "MasterAdmin") {
      return res.status(403).json({
        message: "Access denied. Only MasterAdmin can register users.",
      });
    }

    // Ensure department is set only for non-MasterAdmin users
    if (role !== "MasterAdmin" && !department) {
      return res
        .status(400)
        .json({ message: "Department is required for non-MasterAdmin users." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash password before saving
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      department: role !== "MasterAdmin" ? department : undefined, // Only set department for non-MasterAdmin
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({
      message: "Server error during registration.",
      error: err.message,
    });
  }
}

// Login a user
export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT with user role and department
    const token = sign(
      { id: user._id, role: user.role, department: user.department },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiration time (1 day)
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      role: user.role,
      department: user.department,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error during login.", error: err.message });
  }
}
