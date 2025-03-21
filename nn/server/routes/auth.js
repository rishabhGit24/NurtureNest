const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import User model
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth"); // Ensure this path is correct

// Signup Route
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, address } =
    req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
    });

    await newUser.save(); // Save user to database
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Generate a token
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found with email:", email); // Add logging
      return res.status(400).json({ error: "Invalid credentials, couldn't find user with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password for user:", email); // Add logging
      return res.status(400).json({ error: "Invalid credentials, wrong password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    }); // Replace with your secret

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Internal server error:", err); // Add logging
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/check", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ valid: false, error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace with your secret
    res.json({ valid: true, email: decoded.userId });
  } catch (err) {
    res.status(401).json({ valid: false, error: "Invalid token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// Protect your routes
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route." });
});

module.exports = router;