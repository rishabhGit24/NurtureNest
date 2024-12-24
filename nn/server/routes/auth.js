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

  // Generate a token
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ user, password }, "your_jwt_secret", {
    expiresIn: "1h",
  }); // Replace with your secret

  res.json({ token });
});

router.post("/check", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace with your secret
    res.json({ valid: true, email: decoded.user.email });
  } catch (err) {
    res.status(401).json({ valid: false, error: "Invalid token" });
  }
});

// Protect your routes
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route." });
});

module.exports = router;
