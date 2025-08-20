require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const app = express();

// Environment variables with fallbacks
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nn";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// CORS configuration
app.use(cors({ 
  origin: CORS_ORIGIN,
  credentials: true 
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Local MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to Local MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to Local MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/home", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the home page!" });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NurtureNest API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    database: 'Local MongoDB'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NurtureNest server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS Origin: ${CORS_ORIGIN}`);
  console.log(`🗄️  Database: Local MongoDB (mongodb://localhost:27017/nn/nurturenest)`);
});

