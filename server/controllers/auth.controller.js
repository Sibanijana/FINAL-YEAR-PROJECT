import pkg from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const { hash, compare, genSalt } = pkg;
const { sign } = jwt;

// Enhanced registerUser with better validation
export async function registerUser(req, res) {
  try {
    // Validate input
    const { username, password, role, department, email, mobileNo, collegeId } =
      req.body;

    if (!username || !password || !email || !mobileNo || !collegeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Password strength validation
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Authorization check - must be MasterAdmin to register users
    if (!req.user || req.user.role !== "MasterAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // MasterAdmin validation - only one MasterAdmin can exist
    if (role === "MasterAdmin") {
      const existingMasterAdmin = await User.findOne({ role: "MasterAdmin" });
      if (existingMasterAdmin) {
        return res.status(403).json({
          message: "MasterAdmin already exists. Cannot create more.",
        });
      }
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { mobileNo }, { collegeId }],
    });

    if (existingUser) {
      let conflictField = "";
      if (existingUser.username === username) conflictField = "Username";
      else if (existingUser.email === email) conflictField = "Email";
      else if (existingUser.mobileNo === mobileNo)
        conflictField = "Mobile number";
      else conflictField = "College ID";

      return res.status(400).json({
        message: `${conflictField} already exists`,
      });
    }

    // Hash password with generated salt
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      mobileNo,
      department,
      email,
      collegeId,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

// Enhanced login with token storage
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = sign(
      {
        id: user._id,
        role: user.role,
        department: user.department,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // 1 day expiration

    user.tokens.push({ token, expiresAt });
    await user.save();

    // Secure cookie settings for production
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error during login",
      error: err.message,
    });
  }
}

// Logout endpoint
export async function logoutUser(req, res) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      // Remove the token from the database
      user.tokens = user.tokens.filter((t) => t.token !== token);
      await user.save();
    }

    // Clear cookie
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({
      message: "Server error during logout",
      error: err.message,
    });
  }
}

// Enhanced student registration
export async function registerStudent(req, res) {
  try {
    const {
      username,
      password,
      email,
      mobileNo,
      collegeId,
      department,
      departmentId,
      group,
      semester,
    } = req.body;

    // Validate input
    if (
      !username ||
      !password ||
      !email ||
      !mobileNo ||
      !collegeId ||
      !department ||
      !group ||
      !semester ||
      !departmentId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { mobileNo }, { collegeId }],
    });

    if (existingUser) {
      let conflictField = "";
      if (existingUser.username === username) conflictField = "Username";
      else if (existingUser.email === email) conflictField = "Email";
      else if (existingUser.mobileNo === mobileNo)
        conflictField = "Mobile number";
      else conflictField = "College ID";

      return res.status(400).json({
        message: `${conflictField} already exists`,
      });
    }

    // Hash password
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role: "Student",
      department,
      mobileNo,
      collegeId,
      group,
      semester,
      departmentId: departmentId.toLowerCase(), // Assuming department is a string like "CSE"
      group: group.toUpperCase(), // Ensure group is uppercase
      semester: semester.toLowerCase(), // Ensure semester is lowercase
    });

    await newUser.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
