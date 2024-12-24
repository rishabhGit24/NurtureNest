const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth"); // Import the auth middleware
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/home", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the home page!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
