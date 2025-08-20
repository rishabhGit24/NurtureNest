const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

// JWT Secret - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-here-make-it-long-and-random";

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, address } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !password || !address) {
      return res.status(400).json({ 
        success: false,
        error: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: "User with this email already exists" 
      });
    }

    // Create a new user (password will be hashed automatically by pre-save middleware)
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password, // Will be hashed by pre-save middleware
      address,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      token,
      user: newUser.getPublicProfile()
    });

  } catch (err) {
    console.error('Signup error:', err);
    
    // Handle duplicate key error (email already exists)
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false,
        error: "User with this email already exists" 
      });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        success: false,
        error: errors.join(', ') 
      });
    }

    res.status(500).json({ 
      success: false,
      error: "Internal server error during registration" 
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Email and password are required" 
      });
    }

    // Find user by email and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: "Invalid email or password" 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ 
        success: false,
        error: "Account is deactivated" 
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        error: "Invalid email or password" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Return success response
    res.json({ 
      success: true,
      message: "Login successful",
      token,
      user: user.getPublicProfile()
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error during login" 
    });
  }
});

// Get current user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    res.json({ 
      success: true,
      user: user.getPublicProfile()
    });

  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Debug endpoint to list all users (remove in production)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ 
      success: true,
      count: users.length,
      users: users
    });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ 
    success: true,
    message: "This is a protected route",
    user: req.user
  });
});

module.exports = router;
