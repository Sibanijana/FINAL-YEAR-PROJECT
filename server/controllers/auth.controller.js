import User from "../models/user.model.js";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

// Register a new user
export async function registerUser(req, res) {
  try {
    const { username, password, role, department } = req.body;

    if (req.user.role !== "MasterAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      department,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Login a user
export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ token, role: user.role, department: user.department });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
