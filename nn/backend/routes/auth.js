const express = require("express");
const bcrypt = require("bcrypt");
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
  const { username, password } = req.body;

  // Replace this with your actual user authentication logic
  const user = { id: 1, username }; // Example user

  // Generate a token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "your_jwt_secret",
    { expiresIn: "1h" }
  ); // Replace with your secret

  res.json({ token });
});

// Protect your routes
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route." });
});

module.exports = router;
