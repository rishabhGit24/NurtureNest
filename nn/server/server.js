const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth"); // Import the auth middleware
const app = express();

const cookieParser = require("cookie-parser"); // Import cookie-parser

app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allow requests from all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  })
);
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/home", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the home page!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
